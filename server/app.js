const fs = require('fs');
const http = require('http');
const Koa = require('koa');
const app = new Koa();

const arango = require('arangojs');

const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');

const main = serve(path.join(__dirname, '../dist'));

const config = require('./config')
const db = new arango.Database({ url: config['url'] });
db.useDatabase(config['database']);
db.useBasicAuth(config['username'], config['password']);

app.use(main);

const previewAQL = `for c in coins
filter c['series'] != null
limit 60
return {
    'id': c['_key'],
    'name': c['name'],
    'obverse': c['obverse-thumbnail'],
    'reverse': c['reverse-thumbnail']
}`;

const getCoinAQL = (id) => `for op in 1..1 outbound 'coins/${id}' hasObvSideOf
for rp in 1..1 outbound 'coins/${id}' hasRevSideOf
for ap in 1..1 outbound 'coins/${id}' isUnderAuthOf
let c = document('coins/${id}')
return {
    'coin-info': {
        'id': c['_key'],
        'name': c['name'],
        'series': c['series'],
        'axis': c['axis'],
        'weight': c['weight'],
        'diameter': c['diameter'],
        'material': c['material'],
        'denomination': c['denomination'],
        'authority': ap['name'],
        'authority-url': ap['wikiURL'],
        'start-date': c['start-date'],
        'end-date': c['end-date'],
        'obverse': {
            'image': c['obverse-image'],
            'description': c['obverse-description'],
            'legend': c['obverse-legend']
        },
        'reverse': {
            'image': c['reverse-image'],
            'description': c['reverse-description'],
            'legend': c['reverse-legend']
        }
    },
    'people': {
        'obverse': {
            'id': op['_key'],
            'name': op['name'],
            'image': op['imageURL'],
            'depiction': op['description'] ? op['description'] : op['introduction']
        },
        'reverse': {
            'id': rp['_key'],
            'name': rp['name'],
            'image': rp['imageURL'],
            'depiction': rp['description'] ? rp['description'] : rp['introduction']
        }
    }
}`;


app.use(route.get('/coins', async (ctx) => {
    const resultCursor = await db.query(previewAQL);
    let results = await resultCursor.all();
    for (let result of results) {
        let obvSegs = result['obverse'].split('/');
        let revSegs = result['reverse'].split('/');
        result['obverse'] = config['imageRoot'] + obvSegs[obvSegs.length - 1];
        result['reverse'] = config['imageRoot'] + revSegs[revSegs.length - 1];
    }
    ctx.body = {coins: results};
}));

app.use(route.get('/coins/:id', async (ctx, id) => {
    const resultCursor = await db.query(getCoinAQL(id));
    let results = await resultCursor.all();
    let coin = results[0];
    let ppl = [];
    let obvID = coin['people']['obverse']['id'];
    let revID = coin['people']['reverse']['id'];
    
    let obvSegs = coin['coin-info']['obverse']['image'].split('/');
    let revSegs = coin['coin-info']['reverse']['image'].split('/');
    coin['coin-info']['obverse']['image'] = config['imageRoot'] + obvSegs[obvSegs.length - 1];
    coin['coin-info']['reverse']['image'] = config['imageRoot'] + revSegs[revSegs.length - 1];
    if (obvID === revID) {
        if (obvID !== 'null' && obvID !== 'anonymous') {
            ppl.push({
                'id': coin['people']['obverse']['id'],
                'name': coin['people']['obverse']['name'],
                'side': 'Obverse & Reverse',
                'image': coin['people']['obverse']['image'],
                'depiction': coin['people']['obverse']['depiction']
            });
        }
        
    } else {
        if (obvID !== 'null' && obvID !== 'anonymous') {
            ppl.push({
                'id': obvID,
                'name': coin['people']['obverse']['name'],
                'side': 'Obverse',
                'image': coin['people']['obverse']['image'],
                'depiction': coin['people']['obverse']['depiction']
            });
        }

        if (revID !== 'null' && revID !== 'anonymous') {
            ppl.push({
                'id': revID,
                'name': coin['people']['reverse']['name'],
                'side': 'Reverse',
                'image': coin['people']['reverse']['image'],
                'depiction': coin['people']['reverse']['depiction']
            });
        }
    }
    coin['people'] = ppl;
    ctx.body = {coin: coin};
}));

http.createServer(app.callback()).listen(8080);
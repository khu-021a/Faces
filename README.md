[index]: images/index.png "Index Page"
[coin]: images/coin.png "Single Coin Info"
[people]: images/people.png "Relevant Person/People Info"

# Faces

A progressive web app presents relations between ancient Roman coins and historical figures at that time. It is the project for the short paper "[A Progressive Web Application on Ancient Roman Empire Coins and Relevant Historical Figures with Graph Database](https://link.springer.com/chapter/10.1007/978-3-030-01765-1_26)". Data sources are [OCRE](http://numismatics.org/ocre/), [MANTIS](http://numismatics.org/search/) and [DBpedia](https://wiki.dbpedia.org/).

## Prerequisites

* [Node.js](https://nodejs.org/)
* [ArangoDB](https://www.arangodb.com/)
* [ArangoJS](https://docs.arangodb.com/3.4/Drivers/index.html)
* [Vue.js](https://vuejs.org/)
* [Element UI](https://element.eleme.io)
* [Koa.js](https://koajs.com/)
* [Promise-Polyfill](https://github.com/taylorhakes/promise-polyfill)
* [Fetch API](https://github.com/github/fetch)
* [Nginx](https://nginx.org/) (Reverse Proxy via HTTPS)


## Features

* A basic progressive web app with service work and manifest file.
* Graph database, ArangoDB, used in the back end.
* Web components applied into the front end via Vue.js.
* JSON-LD standard for the metadata.

## Install

```
git clone https://github.com/khu-021a/faces.git

cd faces

npm install

npm run build
```

## Start

```
npm run server
```

Then configure Nginx as a reverse proxy server for the project via HTTPS. [Certbot](https://certbot.eff.org/) can be used to deploy Let's Encrypt certificates for HTTPS.

For images of coins, there is no image service via HTTPS from official data sources. Thus, all coin images have to be downloaded in the file systems to avoid mixed contents when they are presented on the page.

## Screenshots

![Index Page][index]

![Single Coin][coin]

![Relevant Person/People][people]

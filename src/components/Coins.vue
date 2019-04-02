<template>
    <div class="base main-base">
        <div class="content coins">
            <div v-for="coin in coins" :key="coin['id']" class="coin" @click="showDialog($event)">
                <image-tile :previews="coin"></image-tile>
            </div>
        </div>
        <el-dialog width="60%" :visible.sync="dialogVisible"> 
            <el-tabs class="info" type="border-card">
                <el-tab-pane label="Coin">
                    <coin-info :coin="coin['coin-info'] || {}"></coin-info>
                </el-tab-pane>
                <el-tab-pane label="People">
                    <people-info :people="coin['people'] || {}"></people-info>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import 'promise-polyfill/src/polyfill'
import 'whatwg-fetch'
import ImageTile from './ImageTile.vue'
import CoinInfo from './CoinInfo.vue'
import PeopleInfo from './PeopleInfo.vue'

export default {
    name: 'Layout',
    components: {
        ImageTile,
        CoinInfo,
        PeopleInfo
    },
    data () {
        return {
            coins: null,
            dialogVisible: false,
            coin: {
                'coin-info': {
                    'id': '',
                    'name': '',
                    'series': '',
                    'axis': 0,
                    'weight': 0.0,
                    'diameter': 0.0,
                    'material': '',
                    'denomination': '',
                    'authority': '',
                    'authority-url': '',
                    'start-date': '',
                    'end-date': '',
                    'obverse': {
                        'image': '',
                        'description': '',
                        'legend': ''
                    },
                    'reverse': {
                        'image': '',
                        'description': '',
                        'legend': ''
                    }
                },
                'people': []
            }
        }
    },
    methods: {
        getCoins () {
            fetch('/coins', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(data => {
                this.coins = data['coins'];
            }).catch(error => console.error('Fetch data error!', error))
        },
        showDialog (event) {
            this.dialogVisible = true
            console.log(event.target)
            let id = event.target.id
            fetch(`/coins/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(data => {
                this.coin = data['coin'];
            }).catch(error => console.error('Fetch data error!', error))
        }
    },
    mounted() {
        this.getCoins()
    }
}
</script>

<style scoped>
.base {
    width: 100%;
    display: inline-block;
}

.main-base {
    background-color: white;
}

.content {
    min-width: 200px;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
}

.coins {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
}

.coin {
    margin: 0 10px;
}
</style>
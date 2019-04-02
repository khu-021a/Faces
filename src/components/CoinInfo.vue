<template>
    <el-row type="flex" justify="space-around">
        <el-col class="coin-img" :span="13">
            <el-carousel height="348px" :interval="10000" arrow="hover">
                <el-carousel-item label="Obverse">
                    <img :src="coin['obverse']['image']" :alt="'Obverse Side' + coin['obverse']['legend'] ? ': ' + coin['obverse']['legend'] : '' " />
                </el-carousel-item>
                <el-carousel-item label="Reverse">
                    <img :src="coin['reverse']['image']" :alt="'Reverse Side' + coin['reverse']['legend'] ? ': ' + coin['reverse']['legend'] : '' " />
                </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col class="coin-txt" :span="9">
            <h3>{{ coin['name'] }}</h3>
            <p>Series: {{ coin['series'] ? coin['series'] : 'Unknown' }}</p>
            <p>Axis: {{  coin['axis'] ? coin['axis'] : 'Unknown' }}</p>
            <p>Weight: {{ coin['weight'] ? coin['weight'] : 'Unknown' }}</p>
            <p>Diameter: {{ coin['diameter'] ? coin['diameter'] : 'Unknown' }}</p>
            <p>Material: {{  coin['material'] ? coin['material'] : 'Unknown' }}</p>
            <p>Denomination: {{ coin['denomination'] ? coin['denomination'] : 'Unknown' }}</p>
            <p>Authority: {{ coin['authority'] ? coin['authority'] : 'Unknown' }}</p>
            <p>Period: {{ (coin['start-date'] === coin['end-date']) ? coin['start-date'] : (`${coin['start-date'] ? coin['start-date'] : '?'} – ${coin['end-date'] ? coin['end-date'] : '?'}`) }}</p>
            <p>Obverse: {{ coin['obverse']['description'] ? coin['obverse']['description'] : 'Unknown' }}</p>
            <p>Reverse: {{ coin['reverse']['description'] ? coin['reverse']['description'] : 'Unknown' }}</p>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        coin: Object
    },
    data () {
        return {}
    },
    methods: {}
}
</script>

<style scoped>
img {
    margin: 0 calc((100% - 350px) / 2);
}

.el-carousel__item {
    min-width: 350px;
}

.el-row {
    flex-wrap: wrap;
    align-items: center;
}

.coin-img {
    min-width: 350px;
}

.coin-txt {
    min-width: 240px;
}
</style> 
<template>
    <el-row type="flex" class="list" justify="center">
        <el-col :span="24">
            <div v-if="people.length > 0">
                <el-row type="flex" class="list-item" justify="space-around" v-for="person in people" :key="person['id']">
                    <el-col class="person-image">
                        <img :src="person['image'] ? person['image'] : ''" :alt="person['name']" />
                    </el-col>
                    <el-col class="person-info">
                        <h3>{{ person['name'] + ' (' + person['side'] + ')'}}</h3>
                        <p>{{ person['depiction'] ? person['depiction'] : 'Unknown' }}</p>
                    </el-col>
                </el-row>
            </div>
            <div v-else>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col>
                        <p>No/Unknown Relevant Historical Figure(s).</p>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: {
        people: Array
    },
    data () {
        return {}
    },
    methods: {}
}
</script>

<style scoped>
img {
    margin: 0 calc((100% - 300px) / 2);
    max-width: 350px;
    max-height: 350px;
}

.el-row {
    flex-wrap: wrap;
    align-items: center;
}

.list {
    flex-direction: column;
}

.list-item {
    max-width: 100%;
    padding: 10px 0;
}

.person-image {
    max-width: 300px;
    margin: 0 1vw;
}

.person-info {
    min-width: 300px;
    margin: 0 1vw;
}

</style> 
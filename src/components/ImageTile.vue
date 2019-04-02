<template>
    <el-button type="text">
        <img :src="previews['obverse']" ref="image" :alt="previews['name']" :id="previews['id']" @mouseenter="hover(true)" @mouseleave="hover(false)"/>
    </el-button>
</template>

<script>
//import hub from './EventHub.js'

export default {
    props: {
        previews: Object
    },
    data() {
        return {}
    },
    methods: {
        hover(focused){
            if(focused){
                this.$refs.image.src = this.previews['reverse']
            }else{
                this.$refs.image.src = this.previews['obverse']
            }
            
        }
    }
}
</script>

<style scoped>
img {
    width: 175px;
    height: 175px;
}
</style>

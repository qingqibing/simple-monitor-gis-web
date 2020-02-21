<template lang="pug">
    el-container()
        el-aside(width="300px")
            el-scrollbar(style="height:100%;" class="fpi-scroll")
                slide-control()
        el-main
            router-view()
</template>

<script>
    import PubSub from 'pubsub-js'
    import SlideControl from "../components/control/SlideControl";
    export default {
        name: "Main",
        components: { SlideControl }
    }
</script>

<style scoped lang="stylus">
.el-container
    width 100%
    height 100%
    .el-main
        padding 0
        width 100%
        height 100%
        background tan
</style>

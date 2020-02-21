<template lang="pug">
    .container
        p 功能配置
        el-row(justify="space-around")
            el-col(:span="8")
                el-switch(v-model="isPoint" inactive-text="标记" active-color="#13ce66" @change="drawPoint" size="mini")
            el-col(:span="8")
                el-switch(v-model="isLine" inactive-text="直线" active-color="#13ce66" @change="drawLine" size="mini")
            el-col(:span="8")
                el-switch(v-model="isPolygon" inactive-text="多边形" active-color="#13ce66" @change="drawPolygon" size="mini")
        p(style="margin-top: 32px") 视图配置
        p(class="rich-title") Popup
        el-row(justify="space-around")
            el-col(:span="8")
                el-switch(v-model="isPopupPoint" inactive-text="标记" active-color="#13ce66" size="mini")
            el-col(:span="8")
                el-switch(v-model="isPopupLine" inactive-text="直线" active-color="#13ce66" size="mini")
            el-col(:span="8")
                el-switch(v-model="isPopupPolygon" inactive-text="多边形" active-color="#13ce66" size="mini")
        p(class="rich-title") Event
        el-row(justify="space-around")
            el-col(:span="8")
                el-switch(v-model="isEventPoint" inactive-text="标记" active-color="#13ce66" size="mini")
            el-col(:span="8")
                el-switch(v-model="isEventLine" inactive-text="直线" active-color="#13ce66" size="mini")
            el-col(:span="8")
                el-switch(v-model="isEventPolygon" inactive-text="多边形" active-color="#13ce66" size="mini")
        p(class="rich-title") 唯一性
        el-row(justify="space-around")
            el-col(:span="8")
                el-switch(v-model="isUniquePoint" inactive-text="标记" active-color="#13ce66" size="mini")
            el-col(:span="8")
                el-switch(v-model="isUniqueLine" inactive-text="直线" active-color="#13ce66" size="mini")
            el-col(:span="8")
                el-switch(v-model="isUniquePolygon" inactive-text="多边形" active-color="#13ce66" size="mini")
        p(style="margin-top: 32px") 事件配置
        p(class="rich-title") 清除
        el-row(justify="space-around")
            el-col(:span="8")
                el-button(size="mini" type="primary" :disabled="!isPoint" @click="clearLayer('Marker')") Marker
            el-col(:span="8")
                el-button(size="mini" type="primary" :disabled="!isLine" @click="clearLayer('Line')") Line
            el-col(:span="8")
                el-button(size="mini" type="primary" :disabled="!isPolygon" @click="clearLayer('Polygon')") Polygon
</template>

<script>
    import PubSub from 'pubsub-js'
    export default {
        name: "SlideControl",
        data() {
            return {
                isPoint: false,
                isPolygon: false,
                isLine: false,
                isPopupPoint: false,
                isPopupPolygon: false,
                isPopupLine: false,
                isEventPoint: false,
                isEventPolygon: false,
                isEventLine: false,
                isUniquePoint: false,
                isUniquePolygon: false,
                isUniqueLine: false,
            }
        },
        mounted() {
            this.drawPoint()
        },
        methods: {
            /**
             * 允许绘制标记
             */
            drawPoint() {
                PubSub.publish('map:drawPoint', this.isPoint)
            },
            /**
             * 允许多变形
             */
            drawPolygon() {
                PubSub.publish('map:drawPolygon', this.isPolygon)
            },
            /**
             * 允许直线
             */
            drawLine() {
                PubSub.publish('map:drawLine', this.isLine)
            },
            /**
             * 清除
             * @param key
             */
            clearLayer(key) {
                PubSub.publish('map:clear', key)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .container
        padding 8px
        p
            height 24px
            line-height 23px
            font-size 15px
            color #606060
        .el-row
            .label
                padding-right px
            .el-col
                display flex
                justify-content center
        .rich-title
            font-size 12px
            height 24px
            line-height 23px
            text-indent 12px
        >>>.el-switch__label.is-active
                color #606060
</style>

<template lang="pug">
    .container
        el-radio-group(v-model="radio" @change="changeValue")
            el-radio( v-for="(item, index) in  layerList" :label="item.label") {{item.label}}
</template>

<script>

    import {baseLayers} from "../../config/layers";

    export default {
        name: "MapControlSetting",
        computed: {
            layerList() {
                const keys = Object.keys(baseLayers)
                const values = Object.values(baseLayers)
                const list = keys.map((item, index) => {
                    return {
                        value: values[index],
                        label: keys[index]
                    }
                })
                return list
            }
        },
        props: {
            currentBaseLayerName: String
        },
        data() {
            return {
                radio: '',
                baseLayers: baseLayers
            }
        },
        watch: {
            currentBaseLayerName: {
                immediate: true,
                handler(val, old) {
                    console.log(val)
                    console.log(old)
                    if (val !== old) {
                        this.radio = val
                    }
                }
            }
        },
        methods: {
            changeValue(val) {
                const value = this.layerList.find((item, index) => {
                    return item.label == val
                })
                this.$emit('layerChange', val, value)
            }
        }
    }
</script>

<style scoped lang="stylus">
.container
    padding 16px
</style>

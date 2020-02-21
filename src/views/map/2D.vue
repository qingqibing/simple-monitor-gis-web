<template lang="pug">
    .container(id="map")
        el-drawer(
        :visible.sync="isSowControlPain"
        :direction="direction"
        :with-header="false"
        )
            map-control-setting(@layerChange="layerChange" :currentBaseLayerName.async="currentBaseLayerName")
</template>

<script>
    import MapControlSetting from "../../components/map/MapControlSetting";
    import {baseLayers} from "../../config/layers";
    import 'leaflet.chinatmsproviders/src/leaflet.ChineseTmsProviders'
    import * as PubSub from "pubsub-js";
    export default {
        name: "Map2D",
        components: { MapControlSetting },
        data(){
            return {
                baseLayers: baseLayers,
                isSowControlPain: false,
                direction: 'rtl',
                map: null,
                // 基础marker
                baseMarkers: [],
                // 基础直线
                baseLines: [],
                // 基础多边形
                basePolygon: [],
                mapLayerGroup: {
                    baseMarker: null
                },
                OSMUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                currentBaseLayerName: '',
                center: [30, 120],
                layerCate : [
                    {
                        key: 'baseLayer'
                    }
                ],
                loverLayer: {
                    polylines: [],
                    polygons: []
                },
                tempGp: {
                    lineNode: [],
                    lineNodeLen: 0,
                    tempLine: null,
                    polygonNode: [],
                    polygonNodeLen: 0,
                    tempNode: [],
                    tempPolygon: null
                }
            };
        },
        created() {
            const keys = Object.keys(this.baseLayers)
            const values = Object.values(this.baseLayers)
            this.OSMUrl = values[0]
            this.currentBaseLayerName = keys[0]
        },
        async mounted() {
            await this.init();
            PubSub.subscribe('map:drawPoint', (fun, data) => {
                this.drawPoint(data)
            });
            PubSub.subscribe('map:drawLine', (fun, data) => {
                this.drawPolyline(data)
            });
            PubSub.subscribe('map:drawPolygon', (fun, data) => {
                this.drawPolygon(data)
            });
            PubSub.subscribe('map:clear', (fun, data) => {
                console.log(data);
                this.clearMap(data);
            });

        },
        methods: {
            async init() {
                this.map = this.$utils.map.createMap("map");
                await this.$utils.map.createTileLayer(this.map, this.OSMUrl, {
                    _key: this.currentBaseLayerName,
                    _category: this.layerCate[0].key

                });
                this.map.setView(this.center, 11);
                this.$utils.map.addSettingControl(this.map, {}, this.openSitting)
            },
            initEvent() {

            },
            openSitting() {
                this.isSowControlPain = !this.isSowControlPain
                console.log(888)
            },
            /**
             *
             * 地图修改
             * @param val
             */
            async layerChange(val, item) {
                let hasLayer = null
                this.map.eachLayer((layer) => {
                    if(layer.options && layer.options._key == item.label) {
                        hasLayer = layer
                    }
                });
                if (hasLayer) {
                    this.map.removeLayer(hasLayer)
                }
                await this.$utils.map.createTileLayer(this.map, item.value, {
                    _key: item.label,
                    _category: this.layerCate[0].key
                });
            },
            /**
             * 清除缓存
             */
            clearTemps() {
                // 清空线中间数据
                this.tempGp.polygonNode = [];
                this.tempGp.polygonNodeLen = 0;
                if (this.tempGp.tempPolygon) this.tempGp.tempPolygon.remove();
                this.tempGp.tempNode.map(el => el.remove());
                // 清空面中间数据
                this.tempGp.lineNode = [];
                this.tempGp.lineNodeLen = 0;
                if (this.tempGp.tempLine) this.tempGp.tempLine.remove();
                this.tempGp.tempNode.map(el => el.remove());
            },
            /**
             * 绘制标志
             */
            drawPoint(data) {
                this.drawOn();
                if (data) {
                    this.$utils.map.addCursorStyle(this.map, "pointer-cursor");
                    this.map.on("click", evt => {
                        const marker = this.$utils.map.createMakerByLatlng(evt.latlng);
                        this.baseMarkers.push(marker)
                        marker.addTo(this.map);
                    });
                }
            },
            /**
             * 清除元素
             * @param key
             */
            clearMap(key) {
                if (key == 'Marker') {
                    this.baseMarkers.forEach((item, index) => {
                        this.map.removeLayer(item)
                    });
                    this.baseMarkers = []
                    return
                }
                if (key == 'Line') {
                    this.loverLayer.polylines.forEach((item, index) => {
                        this.map.removeLayer(item)
                    })
                    this.loverLayer.polylines = []
                }
                if (key == 'Polygon') {
                    this.loverLayer.polygons.forEach((item, index) => {
                        this.map.removeLayer(item)
                    })
                    this.loverLayer.polygons = []
                }
                this.clearTemps()
            },
            drawOn() {
                this.clearTemps();
                // 移除监听地图事件
                this.map.off("click");
                this.map.off("mousemove");
                this.map.off("dblclick");
                this.map.doubleClickZoom.disable();
            },
            drawOff() {
                // 移除监听地图点击事件
                this.map.off("click");
                this.map.off("mousemove");
                this.map.off("dblclick");
                this.map.doubleClickZoom.enable();

                // 复原鼠标平移样式
                this.$utils.map.removerCoursorStyle(this.map);
            },
            /**
             * 绘制直线
             */
            drawPolyline(data) {
                this.drawOn();
                if (!data) {
                    return
                }
                this.$utils.map.addCursorStyle(this.map, "crosshare-cursor");
                let tempPolygonOpts = {
                    color: "rgba(255, 0, 0, 0.85)",
                    weight: 3,
                    opacity: 0.85
                };

                let finalPolygonOpts = {
                    color: "rgba(0, 255, 0, 0.85)",
                    weight: 3,
                    opacity: 0.85
                };

                this.map.on("click", evt => {
                    this.tempGp.lineNode.push([evt.latlng.lat, evt.latlng.lng]);
                    this.tempGp.tempNode.push(this.addNode(evt.latlng, this.map));
                    this.tempGp.lineNodeLen = this.tempGp.lineNode.length;
                });
                this.map.on("mousemove", evt => {
                    if (this.tempGp.lineNodeLen >= 1) {
                        if (this.tempGp.tempLine) this.tempGp.tempLine.remove();
                        this.tempGp.lineNode[this.tempGp.lineNodeLen] = [
                            evt.latlng.lat,
                            evt.latlng.lng
                        ];

                        this.tempGp.tempLine = this.$utils.map.createPolyline(
                            this.map,
                            this.tempGp.lineNode,
                            tempPolygonOpts
                        );
                    }
                });

                this.map.on("dblclick", () => {
                    this.loverLayer.polylines.push(
                        this.$utils.map.createPolyline(
                            this.map,
                            this.tempGp.lineNode,
                            finalPolygonOpts
                        )
                    );
                    this.tempGp.lineNode = [];
                    this.tempGp.lineNodeLen = 0;
                    this.tempGp.tempLine.remove();
                    this.tempGp.tempNode.map(el => el.remove());
                });
            },
            /**
             * 添加节点
             * @param latlng
             * @param map
             * @return {*}
             */
            addNode(latlng, map) {
                let node = this.$utils.map.createIcon({
                    iconUrl: require("../../assets/images/node.png"),
                    iconSize: [16, 16]
                });
                node = this.$utils.map.createMakerByLatlng(latlng, {
                    icon: node
                });
                node.addTo(map);
                return node;
            },
            /**
             * 绘制多边形
             */
            drawPolygon(data) {
                this.drawOn();
                if (!data) {
                    return
                }
                this.$utils.map.addCursorStyle(this.map, "crosshare-cursor");
                let tempPolygonOpts = {
                    color: "rgba(255, 0, 0, 0.85)",
                    weight: 3,
                    opacity: 0.85
                };

                let finalPolygonOpts = {
                    color: "rgba(0, 255, 0, 0.85)",
                    weight: 3,
                    opacity: 0.85
                };

                this.map.on("click", evt => {
                    this.tempGp.polygonNode.push([evt.latlng.lat, evt.latlng.lng]);
                    this.tempGp.polygonNodeLen = this.tempGp.polygonNode.length;

                    this.tempGp.tempNode.push(this.addNode(evt.latlng, this.map));
                });

                this.map.on("mousemove", evt => {
                    if (this.tempGp.tempPolygon) this.tempGp.tempPolygon.remove();

                    if (this.tempGp.polygonNodeLen == 1) {
                        this.tempGp.polygonNode[this.tempGp.polygonNodeLen] = [
                            evt.latlng.lat,
                            evt.latlng.lng
                        ];
                        this.tempGp.tempPolygon = this.$utils.map.createPolyline(
                            this.map,
                            this.tempGp.polygonNode,
                            tempPolygonOpts
                        );
                    } else if (this.tempGp.polygonNodeLen >= 2) {
                        this.tempGp.polygonNode[this.tempGp.polygonNodeLen] = [
                            evt.latlng.lat,
                            evt.latlng.lng
                        ];

                        this.tempGp.tempPolygon = this.$utils.map.createPolygon(
                            this.map,
                            this.tempGp.polygonNode,
                            tempPolygonOpts
                        );
                    }
                });

                this.map.on("dblclick", () => {
                    this.loverLayer.polygons.push(
                        this.$utils.map.createPolygon(
                            this.map,
                            this.tempGp.polygonNode,
                            finalPolygonOpts
                        )
                    );
                    this.tempGp.polygonNode = [];
                    this.tempGp.polygonNodeLen = 0;
                    this.tempGp.tempPolygon.remove();
                    this.tempGp.tempNode.map(el => el.remove());
                });
            }
        }
    }
</script>

<style scoped lang="stylus">
    #map
        width 100%
        height 100%
    >>>.rtl
        width 20% !important
</style>

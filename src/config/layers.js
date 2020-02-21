/**
 * 智图地图内容
 */
import * as L from "leaflet";
import 'leaflet.chinatmsproviders/src/leaflet.ChineseTmsProviders'
export const normalm1 = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
});
export const normalm2 = L.tileLayer.chinaProvider('Geoq.Normal.Color', {
    maxZoom: 18,
    minZoom: 5
});
export const normalm3 = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
    maxZoom: 18,
    minZoom: 5
});
export const normalm4 = L.tileLayer.chinaProvider('Geoq.Normal.Gray', {
    maxZoom: 18,
    minZoom: 5
});
export const normalm5 = L.tileLayer.chinaProvider('Geoq.Normal.Warm', {
    maxZoom: 18,
    minZoom: 5
});
export const normalm6 = L.tileLayer.chinaProvider('Geoq.Normal.Cold', {
    maxZoom: 18,
    minZoom: 5
});
/**
 * 天地图内容
 */
const normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
        maxZoom: 18,
        minZoom: 5
    }),
    normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
        maxZoom: 18,
        minZoom: 5
    }),
    imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
        maxZoom: 18,
        minZoom: 5
    }),
    imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
        maxZoom: 18,
        minZoom: 5
    });

const normal = L.layerGroup([normalm, normala]),
    image = L.layerGroup([imgm, imga]);
/**
 * 谷歌
 */
const normalMap = L.tileLayer.chinaProvider('Google.Normal.Map', {
        maxZoom: 18,
        minZoom: 5
    }),
    satelliteMap = L.tileLayer.chinaProvider('Google.Satellite.Map', {
        maxZoom: 18,
        minZoom: 5
    });
/**
 * 高德地图
 */
const Gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 5
});
const Gaodimgem = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
    maxZoom: 18,
    minZoom: 5
});
const Gaodimga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
    maxZoom: 18,
    minZoom: 5
});
const Gaodimage = L.layerGroup([Gaodimgem, Gaodimga]);



// export const baseLayers = {
//     "智图地图": normalm1,
//     "智图多彩": normalm2,
//     "智图午夜蓝": normalm3,
//     "智图灰色": normalm4,
//     "智图暖色": normalm5,
//     "智图冷色": normalm6,
//     "天地图": normal,
//     "天地图影像": image,
//     "谷歌地图": normalMap,
//     "谷歌影像": satelliteMap,
//     "高德地图": Gaode,
//     "高德影像": Gaodimage,
// }

export const baseLayers = {
    // "智图地图": normalm1,
    // "智图多彩": normalm2,
    "默认": 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    "智图午夜蓝": "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
    // "智图灰色": normalm4,
    // "智图暖色": normalm5,
    // "智图冷色": normalm6,
    // "天地图": "http://t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a",
    // "天地图影像": image,
    "谷歌地图": "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
    "谷歌影像": "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
    // "高德地图": 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    // "高德影像": Gaodimage,
}

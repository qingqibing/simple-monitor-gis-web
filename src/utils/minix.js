import * as L from "leaflet";

export const creatSettingControl = (callback) => {
    const sitting = L.Control.extend({
        options: {
            position: 'topright' //初始位置

        },

        initialize: function (options) {
            L.Util.extend(this.options, options);

        },
        onAdd: function (map) {
            //创建一个class为 leaflet-control-container的div
            this._container = L.DomUtil.create('div', 'leaflet-control-container');
            //创建一个图片要素
            var div = L.DomUtil.create('div', 'leaflet-control-logo');

            div.id = 'leaflet-control-clegend';
            div.className = "el-icon-s-tools";
            div.style.width = "26px";
            div.style.height = "26px";
            div.style.fontSize = "24px";
            div.style.background = "rgba(0,0,0,.4)";
            div.style.borderRadius = "4px";
            div.style.color = "#fff";
            div.style.lineHeight = "26px";
            div.style.textAlign = "center";
            div.style.zIndex=200;
            div.style.cursor = 'pointer';
            this._legendimg = div;

            this._container.appendChild(this._legendimg);

            //注册关闭事件
            L.DomEvent.addListener(this._legendimg, 'click', this._onCloseControl, this);

            return this._container;
        },
        /**
         *
         * @private
         */
        _onCloseControl: () => {
            // this._map.options.Legend = false;
            // this.remove(this._map);
            callback()
        },
    });
    return new sitting()
}

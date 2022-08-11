<template>
    <a-layout>
        <a-layout-sider>
            <a-button type="primary" @click="addCircle" block> 圆 </a-button>
            <a-button type="primary" @click="addSquare" block> 正方形 </a-button>
            <a-button type="primary" @click="addRhombus" block> 菱形 </a-button>
            <a-button type="primary" @click="addTriangle" block> 三角形 </a-button>
            <a-button type="primary" @click="addCurveShape(false)" block> 水滴 </a-button>
            <a-button type="primary" @click="addCurveShape(true)" block> 填充水滴 </a-button>
            <!-- <a-button type="primary" @click="addCurveShape" block> 贝塞尔水滴 </a-button> -->
            <a-button type="primary" @click="addBalloonShape(false)" block> 气球 </a-button>
            <a-button type="primary" @click="addBalloonShape(true)" block> 填充气球 </a-button>
        </a-layout-sider>
        <a-layout>
            <div :id="id"></div>
        </a-layout>
    </a-layout>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Stroke, Fill, Circle, RegularShape
, 
Icon,
Text
 } from "ol/style";
import axios from "axios";
import GeoJSON from "ol/format/GeoJSON";
export default {
    name: "CustomShape",
    data() {
        return {
            id: "map",
            // featuresUrl: "./data/pois.geojson",
            featuresUrl: "./data/china_pois.geojson",
        };
    },
    props: {},
    mounted() {
        const map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            target: this.id,
            view: new View({
                center: fromLonLat([116.39164, 39.89871]),
                zoom: 6,
            }),
        });
        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });
        this.vectorLayer = vectorLayer;
        this.vectorSource = vectorSource;
        this.map = map;
        window.map = map;
        map.addLayer(vectorLayer);

        this.addFeatures();
    },
    methods: {
        addCircle() {
            /* const styles = [
                new Style({
                    image: new Circle({
                        radius: 8,
                        fill: new Fill({
                            color: "rgb(255,255,255,0.5)",
                        }),
                        stroke: new Stroke({
                            color: "rgb(0,0,255)",
                            width: 2,
                        }),
                    }),
                }),
            ]; */
            const features = this.vectorSource.getFeatures();
            for (let i = 0; i < features.length; i++) {
                const feature = features[i];
                const props = feature.getProperties();
                const style = new Style({
                    text: new Text({
                        text: props["name"],
                        font: "14px sans-serif",
                        textAlign: "right",
                        offsetX: -6,
                    }),
                    image: new Circle({
                        radius: 8,
                        fill: new Fill({
                            color: "rgb(255,255,255,0.5)",
                        }),
                        stroke: new Stroke({
                            color: "rgb(0,0,255)",
                            width: 2,
                        }),
                    }),
                });
                feature.setStyle(style);
            }
            // this.vectorLayer.setStyle(styles);
        },

        addSquare() {
            const styles = [
                new Style({
                    image: new RegularShape({
                        fill: new Fill({
                            color: "rgb(255,255,255,0.5)",
                        }),
                        stroke: new Stroke({
                            color: "rgb(0,0,255)",
                            width: 2,
                        }),
                        points: 4,
                        radius: 8,
                        angle: Math.PI / 4,
                    }),
                }),
            ];
            this.vectorLayer.setStyle(styles);
        },

        addRhombus() {
            const styles = [
                new Style({
                    image: new RegularShape({
                        fill: new Fill({
                            color: "rgb(255,255,255,0.5)",
                        }),
                        stroke: new Stroke({
                            color: "rgb(0,0,255)",
                            width: 2,
                        }),
                        points: 4,
                        radius: 8,
                    }),
                }),
            ];
            this.vectorLayer.setStyle(styles);
        },

        addTriangle() {
            const styles = [
                new Style({
                    image: new RegularShape({
                        fill: new Fill({
                            color: "rgb(255,255,255,0.5)",
                        }),
                        stroke: new Stroke({
                            color: "rgb(0,0,255)",
                            width: 2,
                        }),
                        points: 3,
                        radius: 8,
                    }),
                }),
            ];
            this.vectorLayer.setStyle(styles);
        },


        addBalloonShape(isFilled) {
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 23;
            canvas.height = 42;
            context.beginPath();
            context.lineWidth = 2;
            context.arc(11 , 11, 10, 0, 2 * Math.PI);
            
            if (isFilled) {
                context.fillStyle =  "rgb(0,255,0)";
                context.fill();
            }
            
            context.strokeStyle = "rgb(0,0,255)";
            context.stroke();
      
            context.beginPath();
            context.strokeStyle = "rgb(0,0,255)";
            context.lineWidth = 4;
            context.moveTo(11,20);
            context.lineTo(11,40);
            context.stroke();
            // const pattern = context.createPattern(canvas, 'no-repeat');
            const printImageData = canvas.toDataURL();


            const styles = [
                    /* new Style({
                        fill: new Fill({color: pattern}),
                        stroke: new Stroke({color: "rgb(0,0,255)",width:3}),
                    }), */
                    new Style({
                        image: new Icon({
                            crossOrigin: 'anonymous',
                            // For Internet Explorer 11
                            imgSize: [canvas.width, canvas.height],
                            src: printImageData,
                        }),
                    }),
                ];
            this.vectorLayer.setStyle(styles);
        },

        addDropShape(isFilled) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 23;
            canvas.height = 30;
            context.beginPath();
            context.lineWidth = 2;
            context.arc(11, 11, 10, 1 * Math.PI, 2 * Math.PI);

            if (isFilled) {
                context.fillStyle =  "rgb(0,255,0)";
                context.fill();
            }
            
            context.strokeStyle = "rgb(0,0,255)";
            context.stroke();

            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "rgb(0,0,255)";
            context.moveTo(11,30);
            context.lineTo(1,11);
            context.moveTo(11,30);
            context.lineTo(21, 11);

            if (isFilled) {
                context.moveTo(1,11);
                context.lineTo(21, 11);
                context.fillStyle =  "rgb(0,255,0)";
                context.fill();
            }
            context.stroke();


            context.beginPath();
            context.lineWidth = 2;
            context.arc(11 , 11, 5, 0, 2 * Math.PI);
            if (isFilled) {
                context.fillStyle =  "rgb(255,255,255)";
                context.fill();
            }
            context.strokeStyle = "rgb(0,0,255)";
            context.stroke();

          
            // const pattern = context.createPattern(canvas, 'no-repeat');
            const printImageData = canvas.toDataURL();

            const styles = [
                    new Style({
                        image: new Icon({
                            crossOrigin: 'anonymous',
                            // For Internet Explorer 11
                            imgSize: [canvas.width, canvas.height],
                            src: printImageData,
                        }),
                    }),
                ];
            this.vectorLayer.setStyle(styles);
        },

        addCurveShape(isFilled) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 20;
            canvas.height = 40;
            
            /*
            三次贝塞尔曲线：bezierCurverTo(cpx1,cpy1,cpx2,cpy2,x,y)
            圆弧：arc(x,y,半径，开始弧度，结束弧度，方向)
            */
            //变换-位移
            // ctx.rotate(Math.PI/12);
            ctx.translate(10,20);
            //开始新路径
            ctx.beginPath();       
            //指定起点，建立子路径
            ctx.moveTo(0,0);        
            //绘制二次贝塞尔曲线
            ctx.quadraticCurveTo(5,-5,5,-10);       
            //绘制圆弧
            ctx.arc(0,-10,5,0,Math.PI,true);
        
            //绘制二次贝塞尔曲线
            ctx.quadraticCurveTo(-5,-5,0,0);
        
            if (isFilled) {
                ctx.fillStyle='#00acec';
                ctx.fill();
            } else {
                //显示路径
                ctx.strokeStyle ='#00acec';
                ctx.stroke();
            }
            
            


            const printImageData = canvas.toDataURL();
            const styles = [
                    new Style({
                        image: new Icon({
                            crossOrigin: 'anonymous',
                            // For Internet Explorer 11
                            imgSize: [canvas.width, canvas.height],
                            src: printImageData,
                            scale: 1.5
                        }),
                    }),
                ];
            this.vectorLayer.setStyle(styles);
        },

        addFeatures() {
            let newFeatures = [];
            this.vectorSource.clear();
            axios.get(this.featuresUrl).then((response) => {
                const features = new GeoJSON().readFeatures(response.data);
                for (let i = 0; i < features.length; i++) {
                    const feature = features[i];
                    feature.setGeometry(
                        feature.getGeometry().transform("EPSG:4326", "EPSG:3857")
                    );
                    newFeatures.push(feature);
                }
                this.vectorSource.addFeatures(newFeatures);
            });
        },
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 1000px;
}
</style>

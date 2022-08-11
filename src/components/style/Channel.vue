<template>
    <a-layout>
      <a-layout-sider>
            <a-button type="primary" @click="addChannel1" block>
                渠沟道1
            </a-button>
            <a-button type="primary" @click="addChannel2" block>
                渠沟道2
            </a-button>
            <a-button type="primary" @click="addChannel3" block>
                渠沟道3
            </a-button>
            <a-button type="primary" @click="addChannel4" block>
                渠沟道4
            </a-button>
      </a-layout-sider>
      <a-layout>
        <div :id="id"></div>
      </a-layout>
    </a-layout>
  
</template>

<script>
    import 'ol/ol.css';
    import Map from 'ol/Map';
    import OSM from 'ol/source/OSM';
    import TileLayer from 'ol/layer/Tile';
    import View from 'ol/View';
    import {fromLonLat} from 'ol/proj';
    import VectorLayer from 'ol/layer/Vector';
    import VectorSource from 'ol/source/Vector';
    import {Style,Stroke,Text,Fill} from 'ol/style';
    import FlowLineDashStyle from '../../lib/style/FlowLineDashStyle'
    import FlowLineStyle from '../../lib/style/FlowLineStyle'
    import axios from 'axios'
    import GeoJSON from 'ol/format/GeoJSON';
    export default {
        name: 'Channel1',
        data() {
            return {
                id: "map",
                featuresUrl: './data/river.geojson',
            }
        },
        props: {
        
        },
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
                    zoom: 12,
                }),
            });
            const vectorSource = new VectorSource();
            const vectorLayer = new VectorLayer({
                source: vectorSource,
            })
            this.vectorLayer = vectorLayer;
            this.vectorSource = vectorSource;
            this.map = map;
            window.map = map;
            map.addLayer(vectorLayer);
            
            this.addFeatures();
        },
        methods: {

            addChannel1() {
                const styles = [
                    new Style({
                        stroke: new Stroke({
                            color:"rgb(0,255,0)",
                            width:6,
                            lineCap:"butt",
                            // lineDash:[15,15],
                        }),
                        text: new Text({
                            text: "绘制面",
                            font: "12px sans-serif",
                            overflow: false,
                            fill: new Fill({
                                color: "rgba( 74, 144 , 226 , 1 )"
                            }),
                            stroke: new Stroke({
                                color: "rgba(0,0,0,1)",
                                width: 0
                            }),
                            offsetX: 0,
                            offsetY: 0,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            backgroundFill: new Fill({
                                color: "rgba(0,0,0,0)"
                            }),
                            padding: [0,0,0,0],
                            /* backgroundStroke: new Stroke({
                                color: "rgba(0,0,0,1)",
                                width: 0
                            }) */
                        }),
                        zIndex:20
                    }),
                    new Style({
                        stroke: new Stroke({
                            color:"rgb(255,255,255)",
                            width:4,
                            lineCap:"butt",
                            // lineDash:[15,15],
                        }),
                        zIndex:21
                    })
                ]
                this.vectorLayer.setStyle(
                    styles
                );
                
            },

            addChannel2() {
                const styles = [
                    new Style({
                        stroke: new Stroke({
                            color:"rgb(0,255,0)",
                            width:2,
                            lineDash:[15,15],
                        }),
                    })
                ]
                this.vectorLayer.setStyle(
                    styles
                );
            },

            addChannel3() {
                const styles = [
                    new FlowLineStyle({
                        color: "rgb(0,255,0)",
                        width: 2,
                        arrowSize: [8,8],
                        arrow: 1,
                        map: this.map
                    }),
                    new FlowLineStyle({
                        color: "rgb(0,255,0)",
                        width: 2,
                        map: this.map
                    }),
                ]
                this.vectorLayer.setStyle(
                    styles
                );
            },

            addChannel4() {
                const styles = [
                    new FlowLineStyle({
                        color: "rgb(0,255,0)",
                        width: 2,
                        arrowSize: [8,8],
                        arrow: 1,
                        map: this.map
                    }),
                    new FlowLineDashStyle({
                        color: "rgb(0,255,0)",
                        width: 2,
                        lineDash: [20,10],
                        map: this.map
                    })]

                this.vectorLayer.setStyle(styles);
            },

            addFeatures() {
                let newFeatures = [];
                this.vectorSource.clear();
                axios.get(this.featuresUrl).then((response) => {
                    const features = new GeoJSON().readFeatures(response.data)
                    for (let i = 0; i < features.length; i++) {
                        const feature = features[i];
                        feature.setGeometry(feature.getGeometry().transform("EPSG:4326","EPSG:3857"))
                        newFeatures.push(feature); 
                    }
                    this.vectorSource.addFeatures(newFeatures);
                })
                
            }
        }
        
    }
</script>

<style scoped>
    #map {
        width: 100%;
        height:800px;
    }
</style>

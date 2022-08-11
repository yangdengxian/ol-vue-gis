<template>
    <a-layout>
      <a-layout-sider>
            <a-button type="primary" @click="addDam1" block>
                堤坝1
            </a-button>
            <a-button type="primary" @click="addDam2" block>
                堤坝2
            </a-button>
            <a-button type="primary" @click="addDam3" block>
                堤坝3
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
    import Feature from 'ol/Feature';
    import LineString from 'ol/geom/LineString';
    import {Style,Stroke,Text,Fill} from 'ol/style';
    export default {
        name: 'Dam',
        data() {
            return {
                id: "map",
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
                    zoom: 13,
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

            addDam1() {
                const styles = [
                    new Style({
                        stroke: new Stroke({
                            color:"#000000",
                            width:6,
                            lineDash:[15,45],
                            lineCap:"butt"
                        }),
                        zIndex:20
                    }),
                    new Style({
                        stroke: new Stroke({
                            color:"#ffffff",
                            width:6,
                            lineDash:[15,45],
                            lineDashOffset:30,
                            lineCap:"butt"
                        }),
                        zIndex:21
                    })

                ]
                this.vectorLayer.setStyle(
                    styles
                );
                
            },

            addDam2() {
                // this.addFeatures();
            },

            addDam3() {
                const styles = [
                    new Style({
                        stroke: new Stroke({
                            color:"rgb(255,0,0,0.5)",
                            width:4,
                            
                        }),
                        text: new Text({
                            font: '12px Calibri,sans-serif',
                            text: '北京市',
                            offsetY: -8,
                            fill: new Fill({
                                color: '#000',
                            }),
                            stroke: new Stroke({
                                color: '#fff',
                                width: 3,
                            }),
                        }),
                    }),
                    new Style({
                        text: new Text({
                            font: '12px Calibri,sans-serif',
                            text: '西城区',
                            offsetY: 8,
                            fill: new Fill({
                                color: 'green',
                            }),
                            stroke: new Stroke({
                                color: '#fff',
                                width: 3,
                            }),
                        }),
                    }),
                    
                ]
                this.vectorLayer.setStyle(
                    styles
                );
            },


            addFeatures() {
                this.vectorSource.clear();
                this.vectorSource.addFeatures([
                    new Feature({
                        geometry: new LineString(
                            [
                                [
                                    116.37156486511232,
                                    39.90578590324711
                                ],
                                [
                                    116.40941619873047,
                                    39.90677350742503
                                ]
                            ]
                        ).transform("EPSG:4326","EPSG:3857")
                                })
                            ])
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

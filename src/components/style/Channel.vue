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
    import Feature from 'ol/Feature';
    import LineString from 'ol/geom/LineString';
    import FlowLineDashStyle from '../../lib/style/FlowLineDashStyle'
    import FlowLineStyle from '../../lib/style/FlowLineStyle'
    export default {
        name: 'Channel1',
        data() {
            return {
                id: "map",
                arrowUrl: require('../../assets/images/arrow.png'),
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

            addChannel1() {
                // this.addFeatures();
                
            },

            addChannel2() {
                // this.addFeatures();
            },

            addChannel3() {
                const styles = [
                    new FlowLineStyle({
                        color: "rgb(0,255,0)",
                        width: 4,
                        arrowSize: [10,10],
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
                        width: 4,
                        arrowSize: [10,10],
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
                this.vectorSource.clear();
                /* this.vectorSource.addFeatures([
                    new Feature({
                        geometry: new LineString(
                            [
                                [
                                    116.37753009796143,
                                    39.898641809099914
                                ],
                                [
                                    116.39533996582031,
                                    39.89906981728181
                                ],
                                [
                                    116.41207695007323,
                                    39.89969536289287
                                ],
                                [
                                    116.41156196594237,
                                    39.909209536859834
                                ]
                            ]
                        ).transform("EPSG:4326","EPSG:3857")
                    })
                ]) */

                /* this.vectorSource.addFeatures([
                    new Feature({
                        geometry: new LineString([
                            [
                                116.38564109802246,
                                39.906180946626705
                            ],
                            [
                                116.3929796218872,
                                39.90631262724705
                            ],
                            [
                                116.40031814575194,
                                39.90647722766652
                            ]
                    ]).transform("EPSG:4326","EPSG:3857")
                                })
                            ])
                        }
                    } */

                this.vectorSource.addFeatures([
                    new Feature({
                        geometry: new LineString(
                            [
                                [
                                    116.38559818267822,
                                    39.921223820046116
                                ],
                                [
                                    116.3858127593994,
                                    39.91605629078665
                                ],
                                [
                                    116.38607025146484,
                                    39.911711314759685
                                ],
                                [
                                116.39100551605225,
                                39.91184298474967
                                ],
                                [
                                116.39606952667236,
                                39.91217215861727
                                ],
                                [
                                116.39551162719727,
                                39.91727415127369
                                ],
                                [
                                116.39542579650879,
                                39.92175042533686
                                ],
                                [
                                116.3902759552002,
                                39.92152003602051
                                ],
                                [
                                116.38559818267822,
                                39.921223820046116
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

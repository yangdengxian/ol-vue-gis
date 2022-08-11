<template>
    <div id="cesiumContainer"></div>
</template>

<script>
import { Viewer, createWorldTerrain, Cartesian3, Math} from 'cesium';
import "cesium/Widgets/widgets.css";
export default {
    name: 'ParticleSystem',
    data() {

    },
    mounted() {
        const viewer = new Viewer("cesiumContainer", {
            shouldAnimate: true,
            terrainProvider: createWorldTerrain(),
        });
        const scene = viewer.scene;
        scene.globe.depthTestAgainstTerrain = true;
        this.scene = scene;
        this.resetCameraFunction();
    },
    methods: {
        resetCameraFunction() {
            this.scene.camera.setView({
                destination: Cartesian3.fromDegrees(103.27286649030998, 36.059319493685514, 1674),
                orientation: {
                    heading: Math.toRadians(152),
                    pitch: Math.toRadians(-20.551556),
                },
            });
        },

           
    }
        
    
}
</script>
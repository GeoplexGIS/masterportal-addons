
<script>
import { mapGetters, mapActions } from "vuex";
import proj4 from "proj4";
import ControlIcon from "'../../../src/modules/controls/ControlIcon.vue";
import plexmapState from "../store/statePlexmap";
import plexmapMutations from "../store/mutationsPlexmap";

export default {
    name: "PlexmapViewer",
    components: {
        ControlIcon,
    },

    computed: {
        ...mapGetters("Maps", ["projection", "scale", "getView"]),  
    },

    data () {
        return {
            plexmapState: plexmapState
        }
    },
    created () {
        plexmapMutations.setupPlexmap()
    },

    methods: {
        ...mapActions("Maps", ["setCenter", "setZoomLevel"]),

        togglePlexmapView () {
            const center = Radio.request("MapView", "getCenter")
            const coordinates = proj4(proj4(this.projection.getCode()), 'EPSG:4326', center)

            const resolution = this.getView.getResolution()

            plexmapMutations.togglePlexmap(coordinates, resolution)
        },

        async toggleMapView () {
            const res = await plexmapMutations.toggleMapView()
            
            console.log(res)
            const center = proj4('EPSG:4326', proj4(this.projection.getCode()), res.coords)
            console.log(center)

            this.setZoomLevel(res.zoomLevel);
            this.setCenter(center);
        },
    },


};
</script>

<template>
    <div
    >
        <ControlIcon
            icon-name="bi-wrench"
            :title="$t(`common:menu.controlls.plexmapButton`)"
            :on-click="togglePlexmapView"
            :hidden=!plexmapState.hidden
        />
        <ControlIcon
            icon-name="bi-arrow-left"
            :title="$t(`common:menu.controlls.plexmapButton`)"
            :on-click="toggleMapView"
            :hidden=plexmapState.hidden
        />
    </div>
</template>

<style lang="scss">
    #plex-map-viewer {
        position: absolute;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>
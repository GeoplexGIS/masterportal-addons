
<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import proj4 from "proj4";
import ControlIcon from '../../../src/modules/controls/ControlIcon.vue';
import plexmapState from "../store/statePlexmap";
import plexmapMutations from "../store/mutationsPlexmap";


export default {
    name: "PlexmapButton",
    components: {
        ControlIcon,
    },

    computed: {
        ...mapGetters("Maps", ["projection", "scale", "getView"]),  
    },

    created () {
        plexmapMutations.setupPlexmap()
    },
    data () {
        return {
            plexmapState: plexmapState,
        }
    },

    methods: {
        ...mapActions("Maps", ["setCenter", "setZoomLevel"]),

        togglePlexmapView () {
            const center = Radio.request("MapView", "getCenter")
            const coordinates = proj4(proj4(this.projection.getCode()), 'EPSG:4326', center)

            const resolution = this.getView.getResolution()

            setTimeout(plexmapMutations.togglePlexmap(coordinates, resolution), 2000)
        },

        async toggleMapView () {
            const res = await plexmapMutations.toggleMapView()
            const center = proj4('EPSG:4326', proj4(this.projection.getCode()), res.coords)

            this.setZoomLevel(res.zoomLevel);
            this.setCenter(center);
            setTimeout(plexmapMutations.toggleView(), 2000)
            
        },
    },


};
</script>

<template>
    <div
    >
        <ControlIcon
            icon-name="bi-plexmap"
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
    .bi-plexmap {
        background: url('data:image/png;base64,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');
        height: 32px;
        width: 32px;
    }
</style>
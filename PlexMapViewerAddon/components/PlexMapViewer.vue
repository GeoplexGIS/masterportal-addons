<script>
import ToolTemplate from "../../ToolTemplate.vue";
import { mapGetters, mapMutations } from "vuex";
import getters from "../store/gettersPlexMapViewer";
import mutations from "../store/mutationsPlexMapViewer";

export default {
    name: "PlexMapViewer",
    components: {
        ToolTemplate
    },
    data  ()
    {

        return {
            pmvScript: null,
            containerGen: false,
            pmvLoaded : false,
        }
    },
    created() {
        this.$on("close", this.close);
    },
    mounted() {
        this.pmvScript = document.createElement('script');
        this.pmvScript.setAttribute('src', 'https://demo2.q.geoplex.de/static/api/plexmap-api.js');

        this.pmvScript.onload = () => {
                pmvLoaded = true;
            };
        document.head.appendChild(this.pmvScript);
    },
    computed: {
        ...mapGetters("Tools/PlexMapViewer", Object.keys(getters)),
        ...mapGetters("Map", ["scales"]),
        scale: {
            get () {
                return this.$store.state.Map.scale;
            },
            set (value) {
                this.$store.commit("Map/setScale", value);
            }
        }
    },
    methods: {
        ...mapMutations("Tools/PlexMapViewer", Object.keys(mutations)),
        container () {
            this.containerGen = true;

            return '<div id="viewer-container"></div>'
        },

        close () {
            this.setActive(false);

            const model = Radio.request("ModelList", "getModelByAttributes", {id: this.$store.state.Tools.PlexMapViewer.id});
            

            if (model) {
                model.set("isActive", false);
            }
        }
    },
    watch: {
        containerGen: {
            handler: function () {
                
                if (this.containerGen) {
                    let pmViewer = new PlexMap.Viewer({
                        viewSrc: "https://demo2.q.geoplex.de/v/street360-user-conference/",
                        targetElemId: "viewer-container",
                        layout: "minimal",
                    });
                    console.log(pmViewer);
                    this.containerGen = false;
                }

            },
        },
        pmvScript:{
            handler: function () {
                console.log("PlexMapViewer API loaded");
            },
        } 
            
    },
    

};
</script>

<template lang="html">
    <!-- <ToolTemplate
        :title="$t(name)"
        :icon="icon"
        :active="active"
        :render-to-window="renderToWindow"
        :resizable-window="resizableWindow"
        :deactivateGFI="deactivateGFI"
    > -->
        <!-- <template> -->
            <div v-html="container()" />
        <!-- </template> -->
    <!-- </ToolTemplate> -->
</template>

<style lang="scss">
    @import "~variables";
    #viewer-container {
          width: 1280px;
          height: 720px;
          border: 1px solid lightgray;
          margin: 20px;
    }

    label {
        margin-top: 7px;
    }

    #scale-switcher-select {
        border: 2px solid $secondary;
    }
</style>
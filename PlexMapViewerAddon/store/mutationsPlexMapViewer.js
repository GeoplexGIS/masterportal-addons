import plexmapState from "./statePlexmap";

const plexmapMutations = {
    setupPlexmap () {
        this.createPlexmapScript();
        this.createPlexmapContainer();
    },

    /**
     * Create the Plexmap API script tag and append it to the document head
     * makes plexmap API available
     */
    createPlexmapScript () {
        const plexmap_api = document.createElement("script");
        plexmap_api.setAttribute("src", "https://berlinfk.bf.geoplex.de/static/api/plexmap-api.js");
        plexmap_api.setAttribute("type", "text/javascript");
        
        document.head.appendChild(plexmap_api);
    },

    /**
     * Create a container for the Plexmap viewer
     */
    createPlexmapContainer () {
        const wrapper        = document.getElementById("map-wrapper");
        plexmapState.map     = document.getElementById("map");
        plexmapState.plexmap = document.createElement("div");
                
        plexmapState.plexmap.id = "plex-map-viewer";
        plexmapState.plexmap.setAttribute("hidden", plexmapState.hidden);

        wrapper.insertBefore(plexmapState.plexmap, plexmapState.map);
    },

    /**
     * toggle the plexmap viewer
     * @param {*} coordinates 
     */
    async togglePlexmap (coordinates, resolution) {    
        const elevation = this.transformElevationResolution(resolution)

        if (plexmapState.inital) {
            this.initialize(coordinates, elevation)            
        }
        else if (!plexmapState.map.hidden) {
            this.jumpTo(coordinates, elevation)
        }
  
        this.toggleView()
    },

    /**
     * Async function to get the current vista value
     * @returns the current vista value
     */
    async getVistaValue () {
        return plexmapState.viewer.getVista()
    },

    /**
     * 
     * @param {*} currentResolution 
     * @returns 
     */
    getZoomLevel (currentResolution) {
        const resolutions = mapCollection.getMapView("2D").getResolutions();
        var level = 0;
        if (Array.isArray(resolutions) && resolutions.length > 0) {
            var nearest
            resolutions.forEach((resolution, index) => {
                if (index === 0){
                    nearest = Math.abs(resolution - currentResolution)
                }
                else {
                    const diff = Math.abs(resolution - currentResolution)
                    if (diff < nearest) {
                        nearest = diff
                        level = index
                    }
                }
            })
        }
        return level;
    },

    /**
     * 
     * @returns 
     */
    async toggleMapView () { 
        const vista = await this.getVistaValue()
        const resolution = plexmapMutations.transformElevationResolution(vista.elevation, false)
        const zoomLevel  = this.getZoomLevel(resolution)

        return {coords : [vista.lon, vista.lat], resolution : resolution, zoomLevel : zoomLevel}
    },

    /**
     * 
     * @param {*} resolution 
     * @param {*} elevation 
     * @returns 
     */
    transformElevationResolution(resolution, elevation=true) {
        let msize
        const mapSize = mapCollection.getMap("2D").getSize()
        
        if (mapSize && elevation) {
          msize = Math.max(mapSize[0], mapSize[1]);
        } else {
          msize = Math.max(window.innerWidth, window.innerHeight)
        }


        if (elevation) return resolution * msize / plexmapState.ELEV_FACTOR
        else return resolution / msize * plexmapState.ELEV_FACTOR

      },

    /**
     * initialize the plexmap viewer
     * @param {*} coords 
     */
    initialize (coords, elevation) {
        plexmapState.viewer = new PlexMap.Viewer ({
            viewSrc: "https://berlinfk.bf.geoplex.de/viewer/view/3d/",
            targetElemId: "plex-map-viewer",
            layout: "minimal",
            vista: {
                lon: coords[0],
                lat: coords[1],
                elevation: elevation,
            }
        }),

        plexmapState.inital = false;
    },
    
    /**
     * jump to a specific location in the plexmap viewer
     * @param {*} coords 
     */
    jumpTo (coords, elevation) {
        plexmapState.viewer.jumpTo({
            lon : coords[0],
            lat : coords[1],
            elevation: elevation
        })
    },

    /**
     * toggle between the plexmap viewer and the map
     */
    toggleView () {       
        plexmapState.hidden = !plexmapState.hidden;
        plexmapState.map.hidden = !plexmapState.map.hidden;
        plexmapState.plexmap.hidden = !plexmapState.plexmap.hidden;  
    },
}

export default plexmapMutations;
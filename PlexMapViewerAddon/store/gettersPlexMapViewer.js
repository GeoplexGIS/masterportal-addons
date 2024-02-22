import plexmapState from "./statePlexmap";

const plexmapGetters = {
    all     : plexmapState => plexmapState,
    inital  : plexmapState => plexmapState.inital,
    plexmap : plexmapState => plexmapState.plexmap,
    viewer  : plexmapState => plexmapState.viewer,
    map     : plexmapState => plexmapState.map,
};

export default plexmapGetters
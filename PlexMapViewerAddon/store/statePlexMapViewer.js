import Vue from 'vue';

const plexmapState = Vue.observable({
    ELEV_FACTOR : 3.5360 / 2.0,
    hidden  : true,
    inital  : true,
    plexmap : null,
    viewer  : null,
    map     : null
});

export default plexmapState;

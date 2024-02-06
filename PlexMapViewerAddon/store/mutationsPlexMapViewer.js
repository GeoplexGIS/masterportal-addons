import {generateSimpleMutations} from "../../../../app-store/utils/generators";
import state from "./statePlexMapViewer";

const mutations = {
    /**
     * Creates from every state-key a setter.
     * For example, given a state object {key: value}, an object
     * {setKey:   (state, payload) => *   state[key] = payload * }
     * will be returned.
     */
    ...generateSimpleMutations(state)

     // NOTE overwrite (or create additional) mutations here if you need special behavior in them
};

export default mutations;

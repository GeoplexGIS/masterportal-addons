

import {generateSimpleGetters} from "../../../../app-store/utils/generators";
import state from "./statePlexMapViewer";

const getters = {
    /**
     * Returns an object of simple getters for a state object, where
     * simple means that they will just return an entry for any key.
     * For example, given a state object {key: value}, an object
     * {key: state => state[key]} will be returned.
     * This is useful to avoid writing basic operations.
     * @param {object} state state to generate getters for
     * @returns {object.<string, function>} object of getters
     */
    ...generateSimpleGetters(state)

    // NOTE overwrite (or create additional) getters here if you need special behavior in them
};

export default getters;

import { Feature } from "ol"

/**
 * @enum
 */
const States = {
    /**
     * @constant
     */
    default: 'default',
    hover: 'hover',
    selected: 'selected',
}

/**
 * @param {Feature|Array<Feature>} feature
 * @param {Function} fn
 */
function map(xs, fn) {
    if (Array.isArray(xs)) {
        xs.forEach(x => fn(x));
    } else {
        fn(xs);
    }
}

/**
 * @param {Feature|Array<Feature>} feature
 * @param {boolean} selected
 */
function select(features, selected) {
    const state = selected ? States.selected : States.default;
    map(features, feature => {
        feature.set('state', state);
    });
}

/**
 * @param {Feature|Array<Feature>} feature
 * @param {boolean} highlighted
 */
function highlight(features, highlighted) {
    const state = highlighted ? States.hover : States.default;
    map(features, feature => {
        if (feature.get('state') === States.selected) {
            return;
        }

        feature.set('state', state);
    });
}

export {
    highlight,
    select,
}

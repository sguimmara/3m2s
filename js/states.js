import { Feature } from "ol"

/**
 * @enum
 */
const States = {
    default: 'default',
    hover: 'hover',
    selected: 'selected',
    hidden: 'hidden',
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
        if (feature.get('state') !== States.hidden) {
            feature.set('state', state);
        }
    });
}

/**
 * @param {Feature|Array<Feature>} feature
 * @param {boolean} highlighted
 */
function highlight(features, highlighted) {
    const state = highlighted ? States.hover : States.default;
    map(features, feature => {
        const current = feature.get('state');
        if (current === States.hidden) {
            return;
        }
        if (current === States.selected) {
            return;
        }

        feature.set('state', state);
    });
}

function hide(features, hidden) {
    const state = hidden ? States.hidden : States.default;
    map(features, feature => {
        feature.set('state', state);
    });
}

export {
    highlight,
    select,
    hide
}

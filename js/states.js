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
    map(features, feature => {
        const current = feature.get('state');
        if (selected) {
            current.add(States.selected);
        } else {
            current.delete(States.selected);
        }
        feature.set('state', current);
        feature.set('rev', feature.get('rev') + 1);
    });
}

/**
 * @param {Feature|Array<Feature>} feature
 * @param {boolean} highlighted
 */
function highlight(features, highlighted) {
    map(features, feature => {
        const current = feature.get('state');
        if (!highlighted) {
            current.delete(States.hover);
        } else {
            current.add(States.hover);
        }
        feature.set('state', current);
        feature.set('rev', feature.get('rev') + 1);
    });
}

function hide(features, hidden) {
    map(features, feature => {
        const current = feature.get('state');

        if (hidden) {
            current.add(States.hidden);
        } else {
            current.delete(States.hidden);
        }
        feature.set('state', current);
        feature.set('rev', feature.get('rev') + 1);
    });
}

export {
    highlight,
    select,
    hide,
    States,
}

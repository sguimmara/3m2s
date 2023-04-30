import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { Feature } from "ol";
import _ from "lodash";

const size = { width: 29, height: 40 };

function icon(src, factor = 1) {
    return new Icon({
        anchor: [0.5, 1],
        height: size.height * factor,
        width: size.width * factor,
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src,
    });
}

function normal(src) {
    return new Style({
        image: icon(src),
    });
}

function selected(src) {
    return new Style({
        image: icon(src, 1.3),
        zIndex: 10,
    });
}

function hover(src) {
    return new Style({
        image: icon(src),
        zIndex: 5,
    });
}

const styles = {
    'hidden': new Style(),

    // Default styles
    'default': normal('/images/pin.png'),
    'hover': hover('/images/pin-hover.png'),
    'selected':  selected('/images/pin-selected.png'),

    // Category-specific styles
    'anecdote': normal('/images/pin-anecdote.png'),
    'hover-anecdote': hover('/images/pin-hover-anecdote.png'),

    'balade': normal('/images/pin-balade.png'),
    'hover-balade': hover('/images/pin-hover-balade.png'),

    'culture': normal('/images/pin-culture.png'),
    'hover-culture': hover('/images/pin-hover-culture.png'),

    'nourriture': normal('/images/pin-nourriture.png'),
    'hover-nourriture': hover('/images/pin-hover-nourriture.png'),

    'quotidien': normal('/images/pin-quotidien.png'),
    'hover-quotidien': hover('/images/pin-hover-quotidien.png'),

    'balade': normal('/images/pin-balade.png'),
    'hover-balade': hover('/images/pin-hover-balade.png'),

    'sortie': normal('/images/pin-sortie.png'),
    'hover-sortie': hover('/images/pin-hover-sortie.png'),

    'voyage': normal('/images/pin-voyage.png'),
    'hover-voyage': hover('/images/pin-hover-voyage.png'),
}

/**
 * @param {Feature} states
 * @param {Array<string>} activeCategories
 */
function getStyle(feature, activeCategories) {
    const states = feature.get('state');

    if (states.has('hidden')) {
        return styles['hidden'];
    }

    if (states.has('selected')) {
        return styles['selected'];
    }

    if (states.has('hover')) {
        if (states.has('category')) {
            const featureCats = feature.get('categories');
            for (const c of featureCats) {
                if (activeCategories.has(c)) {
                    return styles[`hover-${c}`];
                }
            }
        } else {
            return styles['hover'];
        }
    }

    if (states.has('category')) {
        const featureCats = feature.get('categories');
        for (const c of featureCats) {
            if (activeCategories.has(c)) {
                return styles[`${c}`];
            }
        }
    }

    return styles['default'];
}

export {
    getStyle,
}

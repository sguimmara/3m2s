import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { States } from "./states";

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
    'hover-anecdote': normal('/images/pin-hover-anecdote.png'),

    'balade': normal('/images/pin-balade.png'),
    'hover-balade': normal('/images/pin-hover-balade.png'),

    'culture': normal('/images/pin-culture.png'),
    'hover-culture': normal('/images/pin-hover-culture.png'),

    'nourriture': normal('/images/pin-nourriture.png'),
    'hover-nourriture': normal('/images/pin-hover-nourriture.png'),

    'quotidien': normal('/images/pin-quotidien.png'),
    'hover-quotidien': normal('/images/pin-hover-quotidien.png'),

    'balade': normal('/images/pin-balade.png'),
    'hover-balade': normal('/images/pin-hover-balade.png'),

    'sortie': normal('/images/pin-sortie.png'),
    'hover-sortie': normal('/images/pin-hover-sortie.png'),

    'voyage': normal('/images/pin-voyage.png'),
    'hover-voyage': normal('/images/pin-hover-voyage.png'),
}

/**
 * @param {Set<string>} states
 */
function getStyle(states) {
    if (states.has('hidden')) {
        return styles['hidden'];
    }

    if (states.has('selected')) {
        return styles['selected'];
    }

    if (states.has('hover')) {
        return styles['hover'];
    }

    return styles['default'];
}

export {
    getStyle,
}

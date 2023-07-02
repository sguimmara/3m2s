import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import _ from "lodash";
import { Fill, Stroke, Text } from "ol/style";
import { FeatureLike } from "ol/Feature";
import { getStates } from "./states";

const size = { width: 29, height: 40 };

function icon(src: any, factor = 1) {
    return new Icon({
        anchor: [0.5, 1],
        height: size.height * factor,
        width: size.width * factor,
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src,
    });
}

function normal(src: string) {
    return new Style({
        image: icon(src),
    });
}

function selected(src: string) {
    return new Style({
        image: icon(src, 1.3),
        text: new Text({
            offsetX: 50,
            offsetY: -20,
            text: 'jour XX',
            fill: new Fill({
                color: 'black',
            }),
            stroke: new Stroke({
                color: 'white',
                width: 5,
            }),
            font: '20px Roboto Condensed',
        }),
        zIndex: 10,
    });
}

function hover(src: string) {
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
    'selected': selected('/images/pin-selected.png'),

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

    'sortie': normal('/images/pin-sortie.png'),
    'hover-sortie': hover('/images/pin-hover-sortie.png'),

    'voyage': normal('/images/pin-voyage.png'),
    'hover-voyage': hover('/images/pin-hover-voyage.png'),
}

function getStyle(feature: FeatureLike, activeCategories: Set<string>) {
    const states = getStates(feature);

    if (states.has('hidden')) {
        return styles['hidden'];
    }

    if (states.has('selected')) {
        return styles['selected'];
    }

    const categories = feature.get('categories');

    if (states.has('hover')) {
        if (states.has('category')) {
            for (const c of categories) {
                if (activeCategories.has(c)) {
                    return styles[`hover-${c}`];
                }
            }
        } else {
            return styles[`hover-${categories[0]}`];
        }
    }

    if (states.has('category')) {
        for (const c of categories) {
            if (activeCategories.has(c)) {
                return styles[`${c}`];
            }
        }
    }

    return styles[`${categories[0]}`];

    // return styles['default'];
}

export {
    getStyle,
}

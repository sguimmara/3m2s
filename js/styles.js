import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import Text from "ol/style/Text";
import { Stroke, Fill } from 'ol/style.js';

import iconDefault from '/images/icon-neutre.png';
import iconHover from '/images/icon-marine.png';
import iconSelected from '/images/icon-select.png';
import iconCity from '/images/icon-ville.png';

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

const defaultStyle = new Style({
    image: icon(iconDefault)
});

const hoverStyle = new Style({
    image: icon(iconHover, 1)
});

const selectedStyle = new Style({
    image: icon(iconSelected, 1.3)
});

function city(name) {
    return new Style({
        image: new Icon({
            anchor: [0.5, 0.5],
            height: size.height * 0.4,
            width: size.width * 0.4,
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: iconCity,
        }),
        text: new Text({
            text: name,
            offsetX: 20,
            font: '16px sans-serif',
            stroke: new Stroke({ color: 'white', width: 2 }),
            fill: new Fill({ color: 'black' }),
        })
    })
}

const hidden = new Style();

export default {
    'default': defaultStyle,
    'hover': hoverStyle,
    'selected': selectedStyle,
    'city': city,
    'hidden': hidden,
}

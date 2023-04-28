import Icon from "ol/style/Icon";

import iconDefault from '/icon-neutre.png';
import iconHover from '/icon-rose.png';
import Style from "ol/style/Style";

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
    image: icon(iconHover, 1.2)
});

export default {
    'default': defaultStyle,
    'hover': hoverStyle,
}

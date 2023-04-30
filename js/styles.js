import Icon from "ol/style/Icon";
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
    image: icon('/images/icon-neutre.png')
});

const hoverStyle = new Style({
    image: icon('/images/icon-marine.png', 1),
    zIndex: 5,
});

const selectedStyle = new Style({
    image: icon('/images/icon-select.png', 1.3),
    zIndex: 10,
});

const hidden = new Style();

export default {
    'default': defaultStyle,
    'hover': hoverStyle,
    'selected': selectedStyle,
    'hidden': hidden,
}

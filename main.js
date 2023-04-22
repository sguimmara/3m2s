import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { fromLonLat } from 'ol/proj';

import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector';

import Stamen from 'ol/source/Stamen.js';
import VectorSource from 'ol/source/Vector';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point.js';

import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import Stroke from 'ol/style/Stroke';

import iconRenard from './public/icon-renard.png';

const basemap = new TileLayer({
    source: new Stamen({ layer: 'watercolor' })
});

const featureIconNormal = new Icon({
    anchor: [0.5, 0.5],
    height: 48,
    width: 48,
    declutterMode: 'declutter',
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    src: iconRenard,
});

const featureIconHover = new Icon({
    anchor: [0.5, 0.5],
    height: 64,
    width: 64,
    declutterMode: 'declutter',
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    src: iconRenard,
});

const defaultIcon = new Style({
    image: featureIconNormal,
});

const highlightIcon = f => new Style({
    image: featureIconHover,
    text: new Text({
        font: '16px Monospace',
        offsetX: 32,
        textAlign: 'start',
        text: f.get('name'),
        fill: new Fill({
            color: [0, 0, 0, 1],
        }),
        stroke: new Stroke({ color: [255, 255, 255, 127], width: 5 }),
    })
});

const cities = new VectorLayer({
    source: new VectorSource(),
})

const map = new Map({
    layers: [basemap, cities],
    target: 'map',
    view: new View({
        center: fromLonLat([139.340, 38.822]),
        zoom: 5.5,
        minZoom: 5.5
    }),
});

let hovered = [];

map.on('pointermove', (evt) => {
    for (const f of hovered) {
        f.setStyle(defaultIcon);
    }
    hovered = map.getFeaturesAtPixel(evt.pixel);
    if (hovered.length > 0) {
        const f = hovered[0];
        f.setStyle(highlightIcon(f));
    }
});

map.on('click', (evt) => {
    const clicked = map.getFeaturesAtPixel(evt.pixel);
    if (clicked.length > 0) {
        window.open(clicked[0].get('url'), 'blank_');
    }
});

function jour(num, lat, lon, url) {
    const feature = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
        name: 'jour ' + num,
        url,
    });

    feature.setStyle(defaultIcon);

    cities.getSource().addFeature(feature);
}

jour(1, 35.553333, 139.781111, 'https://www.instagram.com/p/CjcrM7BLydo')
jour(2, 35.6715, 139.7357, 'https://www.instagram.com/p/CjfTkwhL4U8/');
jour(3, 35.670761980741965, 139.70809949014006, 'https://www.instagram.com/p/Cjh3Zo7LO1a/');
jour(4, 35.72924969846609, 139.71942861764683, 'https://www.instagram.com/p/Cjkf3uErKfK/');
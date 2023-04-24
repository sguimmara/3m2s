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

const featureLayer = new VectorLayer({
    source: new VectorSource(),
})

const source = featureLayer.getSource();

const map = new Map({
    layers: [basemap, featureLayer],
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

const features = Array(90);

function parseDate(text) {
    const [day, month, year] = text.split('/').map(x => Number.parseInt(x));

    return new Date(year, month - 1, day);
}

function jour(num, lat, lon, date, url, ...tags) {
    const feature = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
        name: `jour ${num}`,
        tags,
        day: num,
        date: parseDate(date),
        url,
    });

    feature.setStyle(defaultIcon);

    features[num] = feature;
    featureLayer.getSource().addFeature(feature);
}

function clearFeatures() {
    source.clear();
}

window.search = function (params) {
    clearFeatures();

    if (params === "") {
        source.addFeatures(features);
        return;
    }

    const keywords = params.split(',').map(w => w.trim());

    function test(feature) {
        const name = feature.get('name');
        if (keywords.some(kw => name.includes(kw))) {
            return true;
        }

        const tags = feature.get('tags');
        if (tags.some(t => keywords.some(kw => t.includes(kw)))) {
            return true;
        }

        return false;
    }

    for (const feature of features) {
        if (test(feature)) {
            source.addFeature(feature);
        }
    }
}

function addDate(num) {
    if (num < 0) {
        return;
    }

    if (num >= features.length) {
        return;
    }

    const f = features[num];
    if (f) {
        source.addFeature(f);
    }
}

window.setDate = function (txt) {
    clearFeatures();

    const date = Number.parseInt(txt);
    addDate(date - 1);
    addDate(date);
    addDate(date + 1);
}

jour(1, 35.553, 139.781, '22/09/2022', 'https://www.instagram.com/p/CjcrM7BLydo', 'arrivée', 'aéroport');
jour(2, 35.671, 139.735, '24/09/2022', 'https://www.instagram.com/p/CjfTkwhL4U8/', 'pluie', 'fatigue', 'tokyo', 'salade', 'cuisine');
jour(3, 35.670, 139.708, '25/09/2022', 'https://www.instagram.com/p/Cjh3Zo7LO1a/', 'tokyo', 'harajuku', 'design', 'fiesta', 'gallery');
jour(4, 35.729, 139.719, '26/09/2022', 'https://www.instagram.com/p/Cjkf3uErKfK/', 'tokyo', 'kiddy', 'land', 'ikea');

jour(65, 33.595, 130.403, '26/11/2022', 'https://www.instagram.com/p/CnxUrR4LcyI/', 'fukuoka', 'kyushu', 'sanctuaire', 'dazaifu', 'tenman-gu', 'tenman', 'ramen', 'croquette');
jour(79, 42.988, 142.400, '10/12/2022', 'https://www.instagram.com/p/CpYEiNhNI--/', 'hokkaido', 'shimukappu', 'neige', 'restaurant', 'curry', 'train');
import _ from 'lodash';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {easeIn, easeOut} from 'ol/easing.js';
import { fromLonLat } from 'ol/proj';

import Feature from 'ol/Feature';

import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector';

import Stamen from 'ol/source/Stamen.js';
import VectorSource from 'ol/source/Vector';

import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import iconNormal from '/icon-neutre.png';
import iconActive from '/icon-selected.png';

import { showCard, hideCard } from './card';

import { features } from './db';

const basemap = new TileLayer({
    source: new Stamen({ layer: 'watercolor' })
});

const ratio = 160 / 128;
const width = 32;
const size = { width, height: width * ratio };

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

const featureIconNormal = icon(iconNormal);
const featureIconHover = icon(iconNormal, 1.2);
const featureIconActive = icon(iconActive, 1.5);

const normal = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
        image: featureIconNormal,
    })
});

const hovered = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
        image: featureIconHover
    }),
});

const selected = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
        image: featureIconActive
    }),
});

const map = new Map({
    layers: [basemap, normal, hovered, selected],
    target: 'map',
    view: new View({
        center: fromLonLat([139.340, 38.822]),
        zoom: 5.5,
        minZoom: 5.5,
        enableRotation: false,
    }),
});

map.on('pointermove', (evt) => {
    hovered.getSource().clear();
    normal.getSource().clear();
    normal.getSource().addFeatures(features.filter(ft => ft != null));
    const picked = map.getFeaturesAtPixel(evt.pixel);
    if (picked.length > 0) {
        const f = picked[0];
        hovered.getSource().addFeature(f);
        normal.getSource().removeFeature(f);
    }
});

/**
 * @param {Feature} feature
 */
function select(feature) {
    selected.getSource().addFeature(feature);
    normal.getSource().removeFeature(feature);

    const tags = _.take(_.uniq(feature.get('tags')), 10);

    const delay = 1000;

    hideCard();

    setTimeout(() => {
        showCard({
            title: feature.get('name'),
            url: feature.get('url'),
            date: feature.get('date'),
            tags,
        });
    }, delay);

    map.getView().animate({
        center: feature.get('position'),
        duration: delay,
        easing: easeOut,
        zoom: 10
    })
}

function clearSelection() {
    selected.getSource().clear();
    hideCard();
}

map.on('click', (evt) => {
    selected.getSource().clear();
    normal.getSource().clear();
    hovered.getSource().clear();

    normal.getSource().addFeatures(features.filter(ft => ft != null));

    const clicked = map.getFeaturesAtPixel(evt.pixel);
    if (clicked.length > 0) {
        const f = clicked[0];
        select(f);
    } else {
        clearSelection();
    }
});

window.search = function (params) {
    normal.getSource().clear();

    if (params === "") {
        normal.getSource().addFeatures(features.filter(f => f != null));
        return;
    }

    const keywords = params
        .split(',')
        .map(w => w.trim())
        .map(s => s.toLowerCase());

    function test(feature) {
        const name = feature.get('name').toLowerCase();
        if (keywords.some(kw => name.includes(kw))) {
            return true;
        }

        const tags = feature.get('tags');
        if (tags.some(t => keywords.some(kw => t.toLowerCase().includes(kw)))) {
            return true;
        }

        return false;
    }

    for (const feature of features) {
        if (feature && test(feature)) {
            normal.getSource().addFeature(feature);
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
    source.clear();

    const date = Number.parseInt(txt);
    addDate(date - 1);
    addDate(date);
    addDate(date + 1);
}

for (const f of features) {
    if (f) {
        normal.getSource().addFeature(f);
    }
}
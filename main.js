import _ from 'lodash';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { easeOut } from 'ol/easing.js';
import { fromLonLat } from 'ol/proj';

import Feature from 'ol/Feature';

import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector';

import OSM from 'ol/source/OSM.js';
import Stamen from 'ol/source/Stamen.js';
import VectorSource from 'ol/source/Vector';

import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import iconNormal from '/icon-neutre.webp?url';
import iconActive from '/icon-selected.webp?url';

import { showCard, hideCard } from './card';

import { features } from './db';

let filteredFeatures = [];

const transition = 16;

const basemap = new TileLayer({
    source: new Stamen({ layer: 'watercolor' }),
    maxZoom: transition,
});

const osm = new TileLayer({
    source: new OSM({
        url: 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    }),
    minZoom: transition,
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
    layers: [osm, basemap, normal, hovered, selected],
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
    resetFeatures();
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

    showCard({
        title: feature.get('name'),
        url: feature.get('url'),
        date: feature.get('date'),
        tags,
    });

    setTimeout(() => {
        const currentZoom = map.getView().getZoom();

        map.getView().animate({
            center: feature.get('position'),
            duration: delay,
            easing: easeOut,
            zoom: currentZoom < 10 ? 10 : undefined,
        });
    }, 1);
}

function clearSelection() {
    selected.getSource().clear();
    hideCard();
}

function resetFeatures() {
    normal.getSource().clear();
    normal.getSource().addFeatures(filteredFeatures);
}

map.on('click', (evt) => {
    selected.getSource().clear();
    hovered.getSource().clear();

    resetFeatures();

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
        filteredFeatures = [...features];
        resetFeatures();
        return;
    }

    const keywords = params
        .split(',')
        .map(w => w.trim())
        .map(s => s.toLowerCase());

    filteredFeatures.length = 0;

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
            filteredFeatures.push(feature);
        }
    }

    resetFeatures();
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

filteredFeatures = [...features];
for (const f of features) {
    if (f) {
        normal.getSource().addFeature(f);
    }
}
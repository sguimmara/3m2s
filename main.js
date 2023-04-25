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

import iconNormal from '/icon-neutre.png';
import iconActive from '/icon-selected.png';

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

map.on('click', (evt) => {
    selected.getSource().clear();
    normal.getSource().clear();
    hovered.getSource().clear();

    normal.getSource().addFeatures(features.filter(ft => ft != null));

    const clicked = map.getFeaturesAtPixel(evt.pixel);
    if (clicked.length > 0) {
        const f = clicked[0];
        selected.getSource().addFeature(f);
        normal.getSource().removeFeature(f);
    } else {
        selected.getSource().clear();
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

    features[num] = feature;
    normal.getSource().addFeature(feature);
}

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

jour(1, 35.553, 139.781, '22/09/2022', 'https://www.instagram.com/p/CjcrM7BLydo', 'arrivée', 'aéroport');
jour(2, 35.671, 139.735, '24/09/2022', 'https://www.instagram.com/p/CjfTkwhL4U8/', 'pluie', 'fatigue', 'tokyo', 'salade', 'cuisine');
jour(3, 35.670, 139.708, '25/09/2022', 'https://www.instagram.com/p/Cjh3Zo7LO1a/', 'tokyo', 'harajuku', 'design', 'fiesta', 'gallery');
jour(4, 35.729, 139.719, '26/09/2022', 'https://www.instagram.com/p/Cjkf3uErKfK/', 'tokyo', 'kiddy', 'land', 'ikea');
jour(5, 35.71705539674499, 139.7796110095705, '27/09/2022', 'https://www.instagram.com/p/CjnREdPruzK/', 'ueno', 'musée');
jour(6, 35.884277719318696, 139.30951372001255, '28/09/2022', 'https://www.instagram.com/p/CjppG3qLCgt/', 'kinchakuda', 'fleur');
jour(7, 35.68899932070083, 139.84323468007148, '29/09/2022', 'https://www.instagram.com/p/Cjr8XK8LRHK/', 'residence', 'cuisine');
jour(8, 35.69722016764693, 139.7760437313934, '30/09/2022', 'https://www.instagram.com/p/CjuvQQgLqan/', 'akihabara', 'maison');
jour(9, 35.319996553734754, 139.56973250280654, '01/10/2022', 'https://www.instagram.com/p/Cjz7eS3Lp3T/', 'kamakura', 'mer');
jour(10, 35.69103194848087, 139.84332568919314, '02/10/2022', 'https://www.instagram.com/p/Cj2b_plrDzX/', 'shopping', 'supermarché');
// TODO: gérer plusieurs fois le même jour
jour(11, 35.668961430331834, 139.70495940282433, '03/10/2022', 'https://www.instagram.com/p/Cj496C3rBKF/', 'école', 'japonais');
jour(11, 35.68136016772103, 139.80109635123495, '04/10/2022', 'https://www.instagram.com/p/Cj7htmiLpCm/', 'musée', 'japonais');

jour(65, 33.595, 130.403, '26/11/2022', 'https://www.instagram.com/p/CnxUrR4LcyI/', 'fukuoka', 'kyushu', 'sanctuaire', 'dazaifu', 'tenman-gu', 'tenman', 'ramen', 'croquette');
jour(79, 42.988, 142.400, '10/12/2022', 'https://www.instagram.com/p/CpYEiNhNI--/', 'hokkaido', 'shimukappu', 'neige', 'restaurant', 'curry', 'train');
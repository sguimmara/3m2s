import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import Stamen from 'ol/source/Stamen.js';

import styles from './styles';
import { Feature } from "ol";

function loadBasemaps() {
    const transition = 16;

    const watercolor = new TileLayer({
        source: new Stamen({ layer: 'watercolor' }),
        maxZoom: transition,
    });

    const labels = new TileLayer({
        source: new Stamen({ layer: 'terrain-labels' }),
        maxZoom: transition,
    });

    const osm = new TileLayer({
        source: new OSM({
            url: 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        }),
        minZoom: transition,
    });

    return [watercolor, osm, labels];
}

async function loadCities(url) {
    const res = await fetch(url);
    const json = await res.json();

    const format = new GeoJSON({
        featureProjection: 'EPSG:3857'
    });

    const features = format.readFeatures(json);

    const layer = new VectorLayer({
        source: new VectorSource({
            attributions: 'Morgane Hamon',
            features,
        }),
        style: f => styles.city(f.get('name'))
    });

    return layer;
}

/**
 * @param {Feature} feature
 */
function validate(feature) {
    if (typeof feature.get('url') !== 'string') {
        throw new Error('invalid property: "url" should be a string');
    }
    if (typeof feature.get('description') !== 'string') {
        throw new Error('invalid property: "description" should be a string');
    }
    if (typeof feature.get('day') !== 'number') {
        throw new Error('invalid property: "day" should be a number');
    }
    if (typeof feature.get('date') !== 'string') {
        throw new Error('invalid property: "date" should be a string');
    }
    if (typeof feature.get('thumbnailUrl') !== 'string') {
        throw new Error('invalid property: "thumbnailUrl" should be a string');
    }

    const categories = feature.get('categories');
    if (!Array.isArray(categories)) {
        throw new Error('invalid property: "category" should be an array');
    }
}

/**
 * Loads a GeoJSON and returns the created layer.
 * @param {string} url The URL to the GeoJSON file.
 * @returns {VectorLayer} The created vector layer.
 */
async function loadGeoJSON(url, defaultState = 'default') {
    const res = await fetch(url);
    const json = await res.json();

    const format = new GeoJSON({
        featureProjection: 'EPSG:3857'
    });

    const features = format.readFeatures(json);

    features.forEach(f => {
        validate(f);
        f.set('state', defaultState)
    });

    const layer = new VectorLayer({
        source: new VectorSource({
            attributions: 'Morgane Hamon',
            features,
        }),
        style: f => styles[f.get('state')]
    });

    return layer;
}

export {
    loadGeoJSON,
    loadBasemaps,
    loadCities,
}

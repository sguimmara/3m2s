import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import Stamen from "ol/source/Stamen.js";

import { getStyle } from "./styles";
import { getVectorContext } from "ol/render";
import { Fill, Style } from "ol/style";
import { getActiveCategories } from "./search";
import { Feature } from "ol";

function loadBasemaps() {
    const transition = 16;

    const watercolor = new TileLayer({
        className: "background",
        source: new Stamen({ layer: "watercolor" }),
        maxZoom: transition,
    });

    const labels = new TileLayer({
        source: new Stamen({ layer: "terrain-labels" }),
        maxZoom: transition,
    });

    const clipSource = new VectorSource({
        url: "/data/mask.geojson",
        format: new GeoJSON(),
    });
    const clipLayer = new VectorLayer({
        style: null,
        source: clipSource,
    });

    const style = new Style({
        fill: new Fill({
            color: "black",
        }),
    });

    clipSource.on("addfeature", function () {
        labels.setExtent(clipSource.getExtent());
    });

    labels.on("postrender", function (e) {
        const vectorContext = getVectorContext(e);
        if (e.context) {
            const ctx = e.context as CanvasRenderingContext2D;
            ctx.globalCompositeOperation = "destination-in";
            clipSource.forEachFeature(function (feature) {
                vectorContext.drawFeature(feature, style);
            });
            ctx.globalCompositeOperation = "source-over";
        }
    });

    const osm = new TileLayer({
        source: new OSM({
            url: "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        }),
        minZoom: transition,
    });

    return [watercolor, osm, labels, clipLayer];
}

function validate(feature: Feature) {
    if (typeof feature.get("url") !== "string") {
        throw new Error('invalid property: "url" should be a string');
    }
    if (typeof feature.get("description") !== "string") {
        throw new Error('invalid property: "description" should be a string');
    }
    if (typeof feature.get("day") !== "number") {
        throw new Error('invalid property: "day" should be a number');
    }
    if (typeof feature.get("date") !== "string") {
        throw new Error('invalid property: "date" should be a string');
    }
    if (typeof feature.get("thumbnailUrl") !== "string") {
        throw new Error('invalid property: "thumbnailUrl" should be a string');
    }

    const categories = feature.get("categories");
    if (!Array.isArray(categories)) {
        throw new Error('invalid property: "category" should be an array');
    }
}

async function loadFeatures(url: string) {
    const res = await fetch(url);
    const json = await res.json();

    const format = new GeoJSON({
        featureProjection: "EPSG:3857",
    });

    const features = format.readFeatures(json);

    features.forEach((f) => {
        validate(f);
        f.set("state", new Set());
        f.set("rev", 0);
    });

    const layer = new VectorLayer({
        source: new VectorSource({
            attributions: "Morgane Hamon",
            features,
        }),
        style: (f) => getStyle(f, getActiveCategories()),
    });

    return layer;
}

export { loadFeatures, loadBasemaps };

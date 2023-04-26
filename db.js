import Feature from 'ol/Feature';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj';

const features = [];

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

    features.push(feature);
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
jour(11, 35.668961430331834, 139.70495940282433, '03/10/2022', 'https://www.instagram.com/p/Cj496C3rBKF/', 'école', 'japonais');
jour(12, 35.67139407853297, 139.54832663886458, '04/10/2022', 'https://www.instagram.com/p/Cj-H8nPLW86/', 'musée', 'japonais');
jour(13, 35.68136016772103, 139.80109635123495, '05/10/2022', 'https://www.instagram.com/p/Cj7htmiLpCm/', 'jardin', 'Jindai', 'Jindai shokubutsu kōen', 'sandwich', 'nourriture', 'école', 'japonais', 'train');
jour(14, 35.69181891784017, 139.6969406692195, '06/10/2022', 'https://www.instagram.com/p/CkAvkjQre9u/', 'shinjuku', 'mode gakuen cocoon tower' 'pluie' 'konbini');
jour(15, 35.688297767867354, 139.7027913167005, '07/10/2022', 'https://www.instagram.com/p/CkGXZVLBT0O/', 'shinjuku', 'carnet', 'cafe',);


jour(65, 33.595, 130.403, '26/11/2022', 'https://www.instagram.com/p/CnxUrR4LcyI/', 'fukuoka', 'kyushu', 'sanctuaire', 'dazaifu', 'tenman-gu', 'tenman', 'ramen', 'croquette');
jour(79, 42.988, 142.400, '10/12/2022', 'https://www.instagram.com/p/CpYEiNhNI--/', 'hokkaido', 'shimukappu', 'neige', 'restaurant', 'curry', 'train');

export { features };
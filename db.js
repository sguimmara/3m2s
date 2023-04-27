import Feature from 'ol/Feature';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj';

const features = [];

function parseDate(text) {
    const [day, month, year] = text.split('/').map(x => Number.parseInt(x));

    return new Date(year, month - 1, day);
}

function jour(num, lat, lon, date, url, ...tags) {
    const position = fromLonLat([lon, lat]);
    const feature = new Feature({
        geometry: new Point(position),
        name: `jour ${num}`,
        position,
        tags,
        day: num,
        date: parseDate(date),
        url,
    });

    features.push(feature);
}

jour(1, 35.553, 139.781, '22/09/2022', 'https://www.instagram.com/p/CjcrM7BLydo', 'arrivée', 'aéroport', 'voyage');
jour(2, 35.671, 139.735, '24/09/2022', 'https://www.instagram.com/p/CjfTkwhL4U8/', 'akasaka', 'quartier', 'balade', 'cuisine');
jour(3, 35.670, 139.708, '25/09/2022', 'https://www.instagram.com/p/Cjh3Zo7LO1a/', 'harajuku', 'balade', 'quartier');
jour(4, 35.729, 139.719, '26/09/2022', 'https://www.instagram.com/p/Cjkf3uErKfK/', 'harajuku', 'kiddyland', 'ikea', 'shibuya');
jour(5, 35.71705539674499, 139.7796110095705, '27/09/2022', 'https://www.instagram.com/p/CjnREdPruzK/', 'ueno', 'musée');
jour(6, 35.884277719318696, 139.30951372001255, '28/09/2022', 'https://www.instagram.com/p/CjppG3qLCgt/', 'kinchakuda', 'voyage', 'balade', 'train');
jour(7, 35.68899932070083, 139.84323468007148, '29/09/2022', 'https://www.instagram.com/p/Cjr8XK8LRHK/', 'résidence', 'cuisine');
jour(8, 35.69722016764693, 139.7760437313934, '30/09/2022', 'https://www.instagram.com/p/CjuvQQgLqan/', 'akihabara', 'maison', 'quartier');
jour(9, 35.319996553734754, 139.56973250280654, '01/10/2022', 'https://www.instagram.com/p/Cjz7eS3Lp3T/', 'kamakura', 'mer', 'balade');
jour(10, 35.69103194848087, 139.84332568919314, '02/10/2022', 'https://www.instagram.com/p/Cj2b_plrDzX/', 'shopping', 'supermarché','quotidien');
jour(11, 35.668961430331834, 139.70495940282433, '03/10/2022', 'https://www.instagram.com/p/Cj496C3rBKF/', 'école', 'japonais');
jour(12, 35.67139407853297, 139.54832663886458, '04/10/2022', 'https://www.instagram.com/p/Cj-H8nPLW86/', 'musée', 'japonais');
jour(13, 35.68136016772103, 139.80109635123495, '05/10/2022', 'https://www.instagram.com/p/Cj7htmiLpCm/', 'jardin', 'jindai shokubutsu kōen',  'espace langue tokyo', 'école');
jour(14, 35.69181891784017, 139.6969406692195, '06/10/2022', 'https://www.instagram.com/p/CkAvkjQre9u/', 'shinjuku', 'architecture', 'balade', 'quartier');
jour(15, 35.688297767867354, 139.7027913167005, '07/10/2022', 'https://www.instagram.com/p/CkGXZVLBT0O/', 'shinjuku', 'carnet', );
jour(16, 35.661210973218104, 139.6985750784801, '08/10/2022', 'https://www.instagram.com/p/CkInQHxr3ft/', 'shibuya', 'karaoke','résidence','cuisine');
jour(17, 35.6314974957637, 139.7036261401181, '09/10/2022', 'https://www.instagram.com/p/CkK8bEKuxKc/', 'mipig', 'cochon', 'animaux', 'meguro', 'musée');
jour(18, 35.690114962402575, 139.84756128244877, '10/10/2022', 'https://www.instagram.com/p/CkNwnh8Lkoa/', 'tokyo');
jour(19, 35.67166718039416, 139.6964179305484, '11/10/2022', 'https://www.instagram.com/p/CkSzc7GL6wx/', 'yoyogi', 'balade', 'nourriture','sanctuaire','meiji');
jour(20, 35.68860844527332, 139.84283644436863, '12/10/2022', 'https://www.instagram.com/p/CkQCBfWr30S/', 'ojima social residence', 'résidence');
jour(21, 35.64739963697772, 139.70820272103697, '13/10/2022', 'https://www.instagram.com/p/CkVhwfNrzen/', 'japonais', 'école');
jour(22, 35.668847505509795, 139.70394483383845, '14/10/2022', 'https://www.instagram.com/p/CkYQjSnvZS9/', 'espace langue tokyo', 'école', 'conte', 'urashima taro');
jour(23, 35.68877772167798, 139.84276980758983, '15/10/2022', 'https://www.instagram.com/p/CkdE9xeriD_/', 'résidence', 'quotidien', 'carnet', 'travail');
jour(24, 35.66791601332306, 139.7065473959395, '16/10/2022', 'https://www.instagram.com/p/CkgBVwTrb_g/', 'harajuku', 'kiddyland','balade');
jour(25, 35.754069809722985, 139.80264504551002, '17/10/2022', 'https://www.instagram.com/p/CkiqKusv9In/', 'ayumi hamasaki','kita senju', 'quartier');
jour(26, 35.69141859529852, 139.70501294959433, '18/10/2022', 'https://www.instagram.com/p/CklNbb5L-xF/', 'métro', 'gare', 'train','suica');
jour(27, 35.688714502989484, 139.84266431141955, '19/10/2022', 'https://www.instagram.com/p/CknYnY5LGwW/', 'résidence', 'police');
jour(28, 35.69193861736561, 139.77872062578842, '20/10/2022', 'https://www.instagram.com/p/CkqKiLjrvAt/', 'bettara ichi', 'matsuri', 'festival', 'Nihonbashi');
jour(29, 35.698541715516996, 139.76791077982227, '21/10/2022', 'https://www.instagram.com/p/CkszVHzL3QW/', 'ochanomizu', 'quartier', 'balade');
jour(30, 35.77687996311569, 139.63113655176465, '22/10/2022', 'https://www.instagram.com/p/Ck0QNEYLX-N/', 'sortie', 'train', 'amis');
jour(31, 35.662963438186374, 139.7303854037051, '23/10/2022', 'https://www.instagram.com/p/Ck3FdXorDQE/', 'roppongi', 'massage', 'thai');
jour(32, 35.66671046652166, 139.70617650316308, '24/10/2022', 'https://www.instagram.com/p/Ck5ooR7rBRK/', 'balade', 'marche', 'architecture');
jour(33, 35.688826644575165, 139.84276359277555, '25/10/2022', 'https://www.instagram.com/p/Ck-yc5hrlFg/', 'cuisine', 'résidence', 'amis');
jour(34, 35.67131572621791, 139.70802266895595, '26/10/2022', 'https://www.instagram.com/p/ClBajhnv9aX/', 'sortie', 'café');
jour(35, 35.690951674202644, 139.84281499594064, '27/10/2022', 'https://www.instagram.com/p/ClEFxPwvf6W/', 'anecdote', 'quotidien');
jour(36, 35.69567140202463, 139.70141951051428, '28/10/2022', 'https://www.instagram.com/p/ClG0SXVPZlu/', 'sortie', 'restaurant', 'shinjuku', 'quartier');
jour(37, 35.68859836530411, 139.84279482514899, '29/10/2022', 'https://www.instagram.com/p/ClLwXdhrd73/', 'résidence', 'anecdote', 'quotidien');
jour(38, 35.71112256813582, 139.39387816710556, '30/10/2022', 'https://www.instagram.com/p/ClOQm2aLwIX/', 'sortie', 'balade', 'jardin', 'festival', 'parc');
jour(39, 35.66902339395838, 139.70609250811924, '31/10/2022', 'https://www.instagram.com/p/ClgPYpAL7ke/', 'café', 'carnet', 'école');
jour(40, 35.68883706307737, 139.84275288735944, '01/11/2022', 'https://www.instagram.com/p/Cljr4tkSQ7a/', 'ayumi hamasaki', 'anecdote', 'amis');
jour(41, 35.67099142217013, 139.76432838059546, '02/11/2022', 'https://www.instagram.com/p/CllfoAurPIE/', 'anecdote', 'shopping');
jour(42, 36.23640720246302, 139.18869104888614, '03/11/2022', 'https://www.instagram.com/p/Cln96JgrIKd/', 'voyage', 'train', 'festival', 'matsuri');
jour(43, 35.69103797575522, 139.84298550976536, '04/11/2022', 'https://www.instagram.com/p/Clq2BBNPFMy/', 'cuisine', 'résidence', 'amis');
jour(44, 35.80076923967075, 139.67753825538765, '05/11/2022', 'https://www.instagram.com/p/Clv-vb8vAHD/', 'sortie', 'matsuri', 'festival');
jour(45, 35.671310861785216, 139.7695289913031, '06/11/2022', 'https://www.instagram.com/p/ClyVbCgrtwZ/', 'sortie', 'exposition', 'ginza');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'cuisine', 'amis', 'résidence');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'cuisine', 'amis', 'résidence');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'cuisine', 'amis', 'résidence');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'cuisine', 'amis', 'résidence');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'cuisine', 'amis', 'résidence');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'cuisine', 'amis', 'résidence');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'cuisine', 'amis', 'résidence');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'cuisine', 'amis', 'résidence');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'cuisine', 'amis', 'résidence');




jour(65, 33.595, 130.403, '26/11/2022', 'https://www.instagram.com/p/CnxUrR4LcyI/', 'fukuoka', 'kyushu', 'sanctuaire', 'dazaifu', 'tenman-gu', 'tenman', 'ramen', 'croquette');
jour(79, 42.988, 142.400, '10/12/2022', 'https://www.instagram.com/p/CpYEiNhNI--/', 'hokkaido', 'shimukappu', 'neige', 'restaurant', 'curry', 'train');

export { features };
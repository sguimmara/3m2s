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

jour(1, 35.553, 139.781, '22/09/2022', 'https://www.instagram.com/p/CjcrM7BLydo', 'voyage', 'arrivée', 'aéroport');
jour(2, 35.671, 139.735, '24/09/2022', 'https://www.instagram.com/p/CjfTkwhL4U8/', 'balade','quartier', 'nourriture');
jour(3, 35.670, 139.708, '25/09/2022', 'https://www.instagram.com/p/Cjh3Zo7LO1a/',  'balade', 'quartier');
jour(4, 35.729, 139.719, '26/09/2022', 'https://www.instagram.com/p/Cjkf3uErKfK/', 'quotidien', 'résidence', 'shooping');
jour(5, 35.71705539674499, 139.7796110095705, '27/09/2022', 'https://www.instagram.com/p/CjnREdPruzK/', 'balade', 'culture', 'quartier',  'musée');
jour(6, 35.884277719318696, 139.30951372001255, '28/09/2022', 'https://www.instagram.com/p/CjppG3qLCgt/',  'voyage', 'balade', 'train');
jour(7, 35.68899932070083, 139.84323468007148, '29/09/2022', 'https://www.instagram.com/p/Cjr8XK8LRHK/', 'quotidien','résidence', 'nourriture');
jour(8, 35.69722016764693, 139.7760437313934, '30/09/2022', 'https://www.instagram.com/p/CjuvQQgLqan/', 'balade', 'architecture', 'quartier');
jour(9, 35.319996553734754, 139.56973250280654, '01/10/2022', 'https://www.instagram.com/p/Cjz7eS3Lp3T/', 'voyage', 'amis', 'balade');
jour(10, 35.69103194848087, 139.84332568919314, '02/10/2022', 'https://www.instagram.com/p/Cj2b_plrDzX/', 'shopping', 'résidence','quotidien');
jour(11, 35.668961430331834, 139.70495940282433, '03/10/2022', 'https://www.instagram.com/p/Cj496C3rBKF/', 'quotidien', 'école');
jour(12, 35.67139407853297, 139.54832663886458, '04/10/2022', 'https://www.instagram.com/p/Cj-H8nPLW86/', 'culture', 'musée', 'sortie');
jour(13, 35.68136016772103, 139.80109635123495, '05/10/2022', 'https://www.instagram.com/p/Cj7htmiLpCm/', 'balade','parc', 'train',  'école');
jour(14, 35.69181891784017, 139.6969406692195, '06/10/2022', 'https://www.instagram.com/p/CkAvkjQre9u/', 'balade', 'architecture',  'quartier');
jour(15, 35.688297767867354, 139.7027913167005, '07/10/2022', 'https://www.instagram.com/p/CkGXZVLBT0O/', 'anecdote','carnet' );
jour(16, 35.661210973218104, 139.6985750784801, '08/10/2022', 'https://www.instagram.com/p/CkInQHxr3ft/', 'sortie', 'amis', 'résidence','nourriture');
jour(17, 35.6314974957637, 139.7036261401181, '09/10/2022', 'https://www.instagram.com/p/CkK8bEKuxKc/', 'sortie', 'balade', 'musée');
jour(18, 35.690114962402575, 139.84756128244877, '10/10/2022', 'https://www.instagram.com/p/CkNwnh8Lkoa/', 'anecdote', 'quotidien');
jour(19, 35.67166718039416, 139.6964179305484, '11/10/2022', 'https://www.instagram.com/p/CkSzc7GL6wx/',  'balade', 'nourriture','quotidien', 'sanctuaire');
jour(20, 35.68860844527332, 139.84283644436863, '12/10/2022', 'https://www.instagram.com/p/CkQCBfWr30S/', 'quotidien', 'anecdote', 'résidence');
jour(21, 35.64739963697772, 139.70820272103697, '13/10/2022', 'https://www.instagram.com/p/CkVhwfNrzen/', 'quotidien', 'école');
jour(22, 35.668847505509795, 139.70394483383845, '14/10/2022', 'https://www.instagram.com/p/CkYQjSnvZS9/', 'anecdote', 'école');
jour(23, 35.68877772167798, 139.84276980758983, '15/10/2022', 'https://www.instagram.com/p/CkdE9xeriD_/', 'résidence', 'quotidien', 'carnet', 'travail');
jour(24, 35.66791601332306, 139.7065473959395, '16/10/2022', 'https://www.instagram.com/p/CkgBVwTrb_g/', 'balade', 'quartier','shopping');
jour(25, 35.754069809722985, 139.80264504551002, '17/10/2022', 'https://www.instagram.com/p/CkiqKusv9In/', 'sortie', 'ayumi hamasaki', 'amis', 'quartier');
jour(26, 35.69141859529852, 139.70501294959433, '18/10/2022', 'https://www.instagram.com/p/CklNbb5L-xF/', 'anecdote', 'quotidien', 'train');
jour(27, 35.688714502989484, 139.84266431141955, '19/10/2022', 'https://www.instagram.com/p/CknYnY5LGwW/', 'résidence', 'anecdote', 'quotidien');
jour(28, 35.69193861736561, 139.77872062578842, '20/10/2022', 'https://www.instagram.com/p/CkqKiLjrvAt/', 'sortie', 'amis', 'matsuri', 'quartier');
jour(29, 35.698541715516996, 139.76791077982227, '21/10/2022', 'https://www.instagram.com/p/CkszVHzL3QW/', 'balade', 'café', 'quartier');
jour(30, 35.77687996311569, 139.63113655176465, '22/10/2022', 'https://www.instagram.com/p/Ck0QNEYLX-N/', 'sortie', 'train', 'amis');
jour(31, 35.662963438186374, 139.7303854037051, '23/10/2022', 'https://www.instagram.com/p/Ck3FdXorDQE/', 'balade', 'quartier');
jour(32, 35.66671046652166, 139.70617650316308, '24/10/2022', 'https://www.instagram.com/p/Ck5ooR7rBRK/', 'balade', 'anecdote', 'architecture');
jour(33, 35.688826644575165, 139.84276359277555, '25/10/2022', 'https://www.instagram.com/p/Ck-yc5hrlFg/', 'nourriture', 'résidence', 'amis');
jour(34, 35.67131572621791, 139.70802266895595, '26/10/2022', 'https://www.instagram.com/p/ClBajhnv9aX/', 'sortie', 'café');
jour(35, 35.690951674202644, 139.84281499594064, '27/10/2022', 'https://www.instagram.com/p/ClEFxPwvf6W/', 'anecdote', 'quotidien');
jour(36, 35.69567140202463, 139.70141951051428, '28/10/2022', 'https://www.instagram.com/p/ClG0SXVPZlu/', 'sortie', 'restaurant', 'quartier', 'shinjuku');
jour(37, 35.68859836530411, 139.84279482514899, '29/10/2022', 'https://www.instagram.com/p/ClLwXdhrd73/', 'résidence', 'anecdote', 'quotidien');
jour(38, 35.71112256813582, 139.39387816710556, '30/10/2022', 'https://www.instagram.com/p/ClOQm2aLwIX/', 'sortie', 'balade', 'jardin', 'matsuri', 'parc');
jour(39, 35.66902339395838, 139.70609250811924, '31/10/2022', 'https://www.instagram.com/p/ClgPYpAL7ke/', 'quotidien','café', 'carnet', 'école');
jour(40, 35.68883706307737, 139.84275288735944, '01/11/2022', 'https://www.instagram.com/p/Cljr4tkSQ7a/', 'anecdote', 'ayumi hamasaki', 'amis');
jour(41, 35.67099142217013, 139.76432838059546, '02/11/2022', 'https://www.instagram.com/p/CllfoAurPIE/', 'anecdote', 'shopping');
jour(42, 36.23640720246302, 139.18869104888614, '03/11/2022', 'https://www.instagram.com/p/Cln96JgrIKd/', 'voyage', 'train' , 'matsuri');
jour(43, 35.69103797575522, 139.84298550976536, '04/11/2022', 'https://www.instagram.com/p/Clq2BBNPFMy/', 'nourriture', 'résidence', 'amis');
jour(44, 35.80076923967075, 139.67753825538765, '05/11/2022', 'https://www.instagram.com/p/Clv-vb8vAHD/', 'sortie', 'matsuri');
jour(45, 35.671310861785216, 139.7695289913031, '06/11/2022', 'https://www.instagram.com/p/ClyVbCgrtwZ/', 'sortie', 'exposition', 'culture');
jour(46, 35.6887595125097, 139.84270621738597, '07/11/2022', 'https://www.instagram.com/p/Cl0-yJCrxgr/', 'anecdote', 'nourriture', 'amis', 'résidence');
jour(47, 35.690501376374996, 139.84418424011506, '08/11/2022', 'https://www.instagram.com/p/Cl56dLIr3Yo/', 'anecdote', 'nourriture');
jour(48, 335.658719948224615, 139.7454543536111, '09/11/2022', 'https://www.instagram.com/p/Cl8UxKErfPt/', 'anecdote', 'voyage');
jour(49, 35.44358565257594, 139.64619816079662, '10/11/2022', 'https://www.instagram.com/p/Cl-2b9TLMYg/',  'balade', 'nourriture', 'quartier');
jour(50, 35.69600712619712, 139.70320045728144, '11/11/2022', 'https://www.instagram.com/p/CmJgKJvLP-v/', 'anecdote', 'sortie', 'amis');
jour(51, 35.66424473351945, 139.70299265478997, '12/11/2022', 'https://www.instagram.com/p/CmMZVi_v89D/', 'anecdote', 'faq', 'carnet');
jour(52, 35.660060515385986, 139.70146831426368, '13/11/2022', 'https://www.instagram.com/p/CmO4x1CvWlN/', 'anecdote', 'faq', 'carnet');
jour(53, 35.65613467960075, 139.69548660111255, '14/11/2022', 'https://www.instagram.com/p/Cm9XJL-tvmk/', 'quotidien', 'café');
jour(54, 35.64927760124971, 139.78982754011878, '15/11/2022', 'https://www.instagram.com/p/CnATNBGjdhz/', 'sortie', 'teamlab');
jour(55, 35.699881902640946, 139.5737230668272, '16/11/2022', 'https://www.instagram.com/p/CnCrynlNxcA/', 'sortie', 'balade', 'parc');
jour(56, 35.66877563065635, 139.76151748244777, '17/11/2022', 'https://www.instagram.com/p/CnFiSIwLvDs/', 'sortie', 'anecdote');
jour(57, 35.64780217786823, 139.70793203826642, '18/11/2022', 'https://www.instagram.com/p/CnHy_dTjrBW/', 'sortie', 'nourriture', 'amis');
jour(58, 35.64190706880762, 139.7818493032143, '19/11/2022', 'https://www.instagram.com/p/CnKej6ojBo1/', 'sortie', 'nourriture', 'amis');
jour(59, 35.70079753471413, 139.74806162477714, '20/11/2022', 'https://www.instagram.com/p/CnPhHDcNqMu/', 'sortie', 'nourriture', 'amis');
jour(60, 36.254934049597395, 137.54823804388096, '21/11/2022', 'https://www.instagram.com/p/CnSbvY5rUwv/', 'voyage', 'train');
jour(61, 34.990416424944854, 135.76122009590526, '22/11/2022', 'https://www.instagram.com/p/CnWilzrNEKW/', 'voyage', 'train', 'amis');
jour(62, 34.990416424944854, 135.76120936706917, '23/11/2022', 'https://www.instagram.com/p/CnZ2GlntBQM/', 'voyage', 'balade', 'temple', 'culture');
jour(63, 34.39183303725271, 132.45214461174467, '24/11/2022', 'https://www.instagram.com/p/CnjDBEDjcGy/', 'voyage', 'balade', 'culture', 'musée');
jour(64, 34.29402550679993, 132.322272100387, '25/11/2022', 'https://www.instagram.com/p/Cnl9hm7tlE5/', 'voyage', 'nature', 'café');
jour(65, 33.528820186071705, 130.5525312958335, '26/11/2022', 'https://www.instagram.com/p/CnxUrR4LcyI/', 'voyage', 'culture', 'temple', 'amis', 'nourriture', 'sanctuaire');
jour(66, 33.59482018962006, 130.41436337933493, '27/11/2022', 'https://www.instagram.com/p/Cn4qWcItDS1/', 'voyage', 'train', 'temple', 'culture');
jour(67, 35.689517254770614, 139.84532523804174, '28/11/2022', 'https://www.instagram.com/p/CoDWP3dLnbt/', 'anecdote', 'carnet');
jour(68, 35.69448131400892, 139.77082837716927, '29/11/2022', 'https://www.instagram.com/p/CoIUnhcrmzy/', 'anecdote', 'amis');
jour(69, 35.68844512625614, 139.84275126550762, '30/11/2022', 'https://www.instagram.com/p/CoKq0LbNW3X/', 'anecdote', 'nourriture', 'résidence');
jour(70, 35.654120722744594, 139.70289864912178, '01/12/2022', 'https://www.instagram.com/p/CoNWz-njuEX/', 'anecdote', 'sortie');
jour(71, 35.690485413239806, 139.84417883855835, '02/12/2022', 'https://www.instagram.com/p/Cop-rTmLKSd/', 'anecdote', 'quotidien', 'amis');
jour(72, 35.66015681885342, 139.69930771347006, '03/12/2022', 'https://www.instagram.com/p/CosgtyyrTFo/', 'sortie', 'quartier','amis');
jour(73, 35.66194478033082, 139.6984360946279, '04/12/2022', 'https://www.instagram.com/p/CouLyx2jcpV/', 'sortie', 'shopping');
jour(74, 35.6887796687505, 139.84284306100014, '05/12/2022', 'https://www.instagram.com/p/Co2iyaRj5bD/', 'anecdote', 'résidence');
jour(75, 35.69872869735005, 139.77217109198415, '06/12/2022', 'https://www.instagram.com/p/CpK97bptFrH/', 'anecdote', 'balade');
jour(76, 42.56703056648789, 140.8068332930009, '07/12/2022', 'https://www.instagram.com/p/CpNl_18jEQ0/', 'voyage', 'nourriture');
jour(77, 42.56537656742409, 140.83238013847438, '08/12/2022', 'https://www.instagram.com/p/CpS4psHrt6T/', 'voyage', 'nourriture', 'nature');
jour(78, 43.0557143551677, 141.31254092907776, '09/12/2022', 'https://www.instagram.com/p/CpVq3EUjYxW/', 'voyage', 'balade', 'culture', 'temple', 'musée');
jour(79, 42.990468582067095, 142.3996139610474, '10/12/2022', 'https://www.instagram.com/p/CpYEiNhNI--/', 'voyage', 'train', 'nourriture','nature');
jour(80, 42.78722305464727, 141.67869940400837, '11/12/2022', 'https://www.instagram.com/p/CpkNtxDNOPI/', 'voyage', 'aéroport', 'anecdote');
jour(81, 35.67347797258979, 139.7657559959397, '12/12/2022', 'https://www.instagram.com/p/CpsoYSYjIDA/', 'sortie');
jour(82, 35.73343986351541, 139.71556709594284, '13/12/2022', 'https://www.instagram.com/p/CpvI3HmjZ-d/', 'résidence', 'anecdote');
jour(83, 35.72032859576852, 139.81219451349037, '14/12/2022', 'https://www.instagram.com/p/Cp0qHVpLgWC/', 'balade', 'quartier', 'sanctuaire');
jour(84, 35.69042542147583, 139.83782292680556, '15/12/2022', 'https://www.instagram.com/p/Cp28pNajQ2m/', 'anecdote', 'nourriture');
jour(85, 35.68858800974541, 139.84272914954929, '16/12/2022', 'https://www.instagram.com/p/Cp5dosEDmEF/', 'résidence', 'amis', 'nourriture');
jour(86, 35.71162264419429, 139.7944215886959, '17/12/2022', 'https://www.instagram.com/p/CqBShtkNkWB/', 'sortie', 'amis', 'temple','quartier');
jour(87, 35.67713515998741, 139.8446079926568, '18/12/2022', 'https://www.instagram.com/p/CqEASAwDSGd/', 'résidence', 'amis', 'quotidien');
jour(88, 35.62829114035178, 139.73597037249965, '19/12/2022', 'https://www.instagram.com/p/CqGJ_R5IVNs/', 'sortie', 'amis', 'teamlab');
jour(89, 35.54404054872018, 139.76749199696005, '20/12/2022', 'https://www.instagram.com/p/CqJPnyHjiKj/', 'voyage', 'départ', 'aéroport');

export { features };
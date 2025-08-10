import L, { Icon } from 'leaflet';

//  ---------- Buildings ----------
const gate = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/gate.png',
		iconSize: [48 * scale, 35 * scale],
		iconAnchor: [24 * scale, 35 * scale],
		popupAnchor: [0, -35 * scale],
	});

	return icon;
};

const lib = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/lib.png',
		iconSize: [45 * scale, 21 * scale],
		iconAnchor: [22 * scale, 21 * scale],
		popupAnchor: [0, -21 * scale],
	});

	return icon;
};

const exec = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/exec.png',
		iconSize: [48 * scale, 22 * scale],
		iconAnchor: [24 * scale, 22 * scale],
		popupAnchor: [0, -22 * scale],
	});

	return icon;
};

const sports = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/sports.png',
		iconSize: [52 * scale, 22 * scale],
		iconAnchor: [26 * scale, 22 * scale],
		popupAnchor: [0, -22 * scale],
	});

	return icon;
};

const court = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/court.png',
		iconSize: [72 * scale, 35 * scale],
		iconAnchor: [36 * scale, 35 * scale],
		popupAnchor: [0, -35 * scale],
	});

	return icon;
};

const activity = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/activity.png',
		iconSize: [55 * scale, 16 * scale],
		iconAnchor: [28 * scale, 16 * scale],
		popupAnchor: [0, -16 * scale],
	});

	return icon;
};

const humanities = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/humanities.png',
		iconSize: [53 * scale, 28 * scale],
		iconAnchor: [26.5 * scale, 28 * scale],
		popupAnchor: [0, -28 * scale],
	});

	return icon;
};

const complex = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/complex.png',
		iconSize: [53.76 * scale, 27.52 * scale],
		iconAnchor: [26.88 * scale, 27.52 * scale],
		popupAnchor: [0, -27.52 * scale],
	});

	return icon;
};

const eng = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/eng.png',
		iconSize: [53.76 * scale, 27.52 * scale],
		iconAnchor: [26.88 * scale, 27.52 * scale],
		popupAnchor: [0, -27.52 * scale],
	});

	return icon;
};

const science = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/science.png',
		iconSize: [40 * scale, 24 * scale],
		iconAnchor: [20 * scale, 24 * scale],
		popupAnchor: [0, -24 * scale],
	});

	return icon;
};

const business = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/business.png',
		iconSize: [74 * scale, 23 * scale],
		iconAnchor: [37 * scale, 23 * scale],
		popupAnchor: [0, -23 * scale],
	});

	return icon;
};

//  ---------- Architectures ----------
type architectDimensionsType = {
	windmill: [number, number];
	dog: [number, number];
	river: [number, number];
	key: [number, number];
	pond: [number, number];
	plantation: [number, number];
	paulownia: [number, number];
	literature: [number, number];
	communication: [number, number];
	poem: [number, number];
};

const architectDimensions: architectDimensionsType = {
	windmill: [16.38, 34.65],
	dog: [16, 16],
	river: [49, 18.2],
	key: [59, 32],
	pond: [76, 35],
	plantation: [82, 17],
	paulownia: [40, 35],
    literature: [23.1, 37.8],
    communication: [69, 34], 
    poem: [53.9, 14.7]
};

const windmill = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/windmill.png',
		iconSize: [
			architectDimensions.windmill[0] * scale,
			architectDimensions.windmill[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.windmill[0] / 2) * scale,
			architectDimensions.windmill[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.windmill[1] * scale],
	});

	return icon;
};

const dog = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/dog.png',
		iconSize: [
			architectDimensions.dog[0] * scale,
			architectDimensions.dog[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.dog[0] / 2) * scale,
			architectDimensions.dog[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.dog[1] * scale],
	});

	return icon;
};

const river = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/river.png',
		iconSize: [
			architectDimensions.river[0] * scale,
			architectDimensions.river[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.river[0] / 2) * scale,
			architectDimensions.river[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.river[1] * scale],
	});

	return icon;
};

const key = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/key.png',
		iconSize: [
			architectDimensions.key[0] * scale,
			architectDimensions.key[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.key[0] / 2) * scale,
			architectDimensions.key[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.key[1] * scale],
	});

	return icon;
};

const paulownia = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/paulownia.png',
		iconSize: [
			architectDimensions.paulownia[0] * scale,
			architectDimensions.paulownia[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.paulownia[0] / 2) * scale,
			architectDimensions.paulownia[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.paulownia[1] * scale],
	});

	return icon;
};

const pond = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/pond.png',
		iconSize: [
			architectDimensions.pond[0] * scale,
			architectDimensions.pond[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.pond[0] / 2) * scale,
			architectDimensions.pond[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.pond[1] * scale],
	});

	return icon;
};

const plantation = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/plantation.png',
		iconSize: [
			architectDimensions.plantation[0] * scale,
			architectDimensions.plantation[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.plantation[0] / 2) * scale,
			architectDimensions.plantation[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.plantation[1] * scale],
	});

	return icon;
};

const literature = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/literature.png',
		iconSize: [
			architectDimensions.literature[0] * scale,
			architectDimensions.literature[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.literature[0] / 2) * scale,
			architectDimensions.literature[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.literature[1] * scale],
	});

	return icon;
};

const communication = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/icon.png',
		iconSize: [
			architectDimensions.communication[0] * scale,
			architectDimensions.communication[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.communication[0] / 2) * scale,
			architectDimensions.communication[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.communication[1] * scale],
	});

	return icon;
};

const poem = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/poem.png',
		iconSize: [
			architectDimensions.poem[0] * scale,
			architectDimensions.poem[1] * scale,
		],
		iconAnchor: [
			(architectDimensions.poem[0] / 2) * scale,
			architectDimensions.poem[1] * scale,
		],
		popupAnchor: [0, -architectDimensions.poem[1] * scale],
	});

	return icon;
};

//  ---------- Miscellaneous ----------
const parkingIconSize = 12;

const ubike = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/bike.png',
		iconSize: [10 * scale, 10 * scale],
		iconAnchor: [5 * scale, 10 * scale],
		popupAnchor: [0, -10 * scale],
	});

	return icon;
};

const parking = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/parking.png',
		iconSize: [parkingIconSize * scale, parkingIconSize * scale],
		iconAnchor: [(parkingIconSize / 2) * scale, parkingIconSize * scale],
		popupAnchor: [0, -parkingIconSize * scale],
	});

	return icon;
};

const basketball = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/basketball.png',
		iconSize: [8 * scale, 8 * scale],
		iconAnchor: [4 * scale, 8 * scale],
		popupAnchor: [0, -8 * scale],
	});

	return icon;
};

const tennis = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/tennis.png',
		iconSize: [8 * scale, 8 * scale],
		iconAnchor: [4 * scale, 8 * scale],
		popupAnchor: [0, -8 * scale],
	});

	return icon;
};

const woodball = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/woodball.png',
		iconSize: [8 * scale, 8 * scale],
		iconAnchor: [4 * scale, 8 * scale],
		popupAnchor: [0, -8 * scale],
	});

	return icon;
};

const volleyball = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/volleyball.png',
		iconSize: [8 * scale, 8 * scale],
		iconAnchor: [4 * scale, 8 * scale],
		popupAnchor: [0, -8 * scale],
	});

	return icon;
};

const baseball = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/baseball.png',
		iconSize: [8 * scale, 8 * scale],
		iconAnchor: [4 * scale, 8 * scale],
		popupAnchor: [0, -8 * scale],
	});

	return icon;
};

const track = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/track.png',
		iconSize: [8 * scale, 8 * scale],
		iconAnchor: [4 * scale, 8 * scale],
		popupAnchor: [0, -8 * scale],
	});

	return icon;
};

const dorm = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/dorm.png',
		iconSize: [8 * scale, 8 * scale],
		iconAnchor: [4 * scale, 8 * scale],
		popupAnchor: [0, -8 * scale],
	});

	return icon;
};

const familymart = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/familymart.png',
		iconSize: [8 * scale, 8 * scale],
		iconAnchor: [4 * scale, 8 * scale],
		popupAnchor: [0, -8 * scale],
	});

	return icon;
};

export {
	ubike,
	parking,
	gate,
	lib,
	exec,
	sports,
	court,
	activity,
	humanities,
	business,
	complex,
	eng,
	science,
	windmill,
	pond,
	dog,
	river,
	key,
	paulownia,
	plantation,
	literature,
	communication,
	poem,
	basketball,
	tennis,
	woodball,
	baseball,
	dorm,
	track,
	volleyball,
	familymart,
};

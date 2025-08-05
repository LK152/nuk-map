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

const eng = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/eng.png',
		iconSize: [117 * scale, 29 * scale],
		iconAnchor: [58.5 * scale, 29 * scale],
		popupAnchor: [0, -29 * scale],
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

const windmill = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/windmill.png',
		iconSize: [26 * scale, 55 * scale],
		iconAnchor: [13 * scale, 55 * scale],
		popupAnchor: [0, -55 * scale],
	});

	return icon;
};

const dog = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/dog.png',
		iconSize: [31 * scale, 31 * scale],
		iconAnchor: [15.5 * scale, 31 * scale],
		popupAnchor: [0, -31 * scale],
	});

	return icon;
};

const river = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/river.png',
		iconSize: [70 * scale, 26 * scale],
		iconAnchor: [35 * scale, 26 * scale],
		popupAnchor: [0, -26 * scale],
	});

	return icon;
};

const key = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/key.png',
		iconSize: [59 * scale, 32 * scale],
		iconAnchor: [29.5 * scale, 32 * scale],
		popupAnchor: [0, -32 * scale],
	});

	return icon;
};

const paulownia = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/paulownia.png',
		iconSize: [40 * scale, 35 * scale],
		iconAnchor: [20 * scale, 35 * scale],
		popupAnchor: [0, -35 * scale],
	});

	return icon;
};

const pond = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/pond.png',
		iconSize: [76 * scale, 35 * scale],
		iconAnchor: [38 * scale, 35 * scale],
		popupAnchor: [0, -35 * scale],
	});

	return icon;
};

const plantation = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/plantation.png',
		iconSize: [82 * scale, 17 * scale],
		iconAnchor: [41 * scale, 17 * scale],
		popupAnchor: [0, -17 * scale],
	});

	return icon;
};

const literature = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/literature.png',
		iconSize: [33 * scale, 54 * scale],
		iconAnchor: [16.5 * scale, 54 * scale],
		popupAnchor: [0, -54 * scale],
	});

	return icon;
};

const communication = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/icon.png',
		iconSize: [69 * scale, 34 * scale],
		iconAnchor: [34.5 * scale, 34 * scale],
		popupAnchor: [0, -34 * scale],
	});

	return icon;
};

const poem = (scale: number) => {
	const icon: Icon = L.icon({
		iconUrl: '/icons/poem.png',
		iconSize: [77 * scale, 21 * scale],
		iconAnchor: [38.5 * scale, 21 * scale],
		popupAnchor: [0, -21 * scale],
	});

	return icon;
};

//  ---------- Miscellaneous ----------

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
		iconSize: [5 * scale, 5 * scale],
		iconAnchor: [2.5 * scale, 5 * scale],
		popupAnchor: [0, -5 * scale],
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
};

import L, { Icon, LatLngTuple } from 'leaflet';

type locationsType = {
	name: string;
	coord: LatLngTuple;
	icon: (scale: number) => Icon;
	type: string;
};

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

const locations: locationsType[] = [
	{
		name: '校門口',
		coord: [22.732428730087655, 120.28461166106801],
		icon: gate,
		type: 'building',
	},
	{
		name: '圖資大樓',
		coord: [22.73414569608387, 120.28518432455931],
		icon: lib,
		type: 'building',
	},
	{
		name: '行政大樓',
		coord: [22.73415305080536, 120.28368835438248],
		icon: exec,
		type: 'building',
	},
	{
		name: '運健休大樓',
		coord: [22.734222233746483, 120.27813130917919],
		icon: sports,
		type: 'building',
	},
	{
		name: '風雨球場',
		coord: [22.73101069169259, 120.27957527870095],
		icon: court,
		type: 'building',
	},
	{
		name: '學生活動中心',
		coord: [22.732165183210903, 120.28127642135759],
		icon: activity,
		type: 'building',
	},
	{
		name: '人文院',
		coord: [22.735200265860797, 120.28150837452102],
		icon: humanities,
		type: 'building',
	},
	{
		// name: '工院綜合大樓',
		name: '工學院',
		coord: [22.731905894048207, 120.2766975978638],
		icon: eng,
		type: 'building',
	},
	{
		name: '理院',
		coord: [22.73544149855268, 120.28608878661407],
		icon: science,
		type: 'building',
	},
	{
		name: '管法院',
		coord: [22.732534910380707, 120.28753053179393],
		icon: business,
		type: 'building',
	},
	{
		name: '風車',
		coord: [22.73266358116765, 120.28047063049529],
		icon: windmill,
		type: 'architect',
	},
	{
		name: '阿呆',
		coord: [22.731563086119646, 120.28047648540796],
		icon: dog,
		type: 'architect',
	},
	{
		name: '記憶河流',
		coord: [22.734759648038576, 120.28207252038025],
		icon: river,
		type: 'architect',
	},
	{
		name: '解鎖大地',
		coord: [22.734009126308436, 120.27880598633568],
		icon: key,
		type: 'architect',
	},
	{
		name: '莿桐',
		coord: [22.732607303379705, 120.27798367929977],
		icon: paulownia,
		type: 'architect',
	},
	{
		name: '生態池',
		coord: [22.733145623087292, 120.28138260935852],
		icon: pond,
		type: 'architect',
	},
	{
		name: '根植大地',
		coord: [22.733293784811806, 120.27827688906338],
		icon: plantation,
		type: 'architect',
	},
	{
		name: '書香',
		coord: [22.734789530691216, 120.28802986340852],
		icon: literature,
		type: 'architect',
	},
	{
		name: '對話',
		coord: [22.73241201312254, 120.28754475241776],
		icon: communication,
		type: 'architect',
	},
	{
		name: '大地樂章',
		coord: [22.733691170748294, 120.28611723353849],
		icon: poem,
		type: 'architect',
	},
];

export default locations;

import {
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
	dorm,
	baseball,
	track,
	complex,
	volleyball,
	familymart,
} from '@components/Map/mapIcons';
import { LatLngTuple, Icon } from 'leaflet';

type locationsType = {
	name: string;
	coord: LatLngTuple;
	icon: (scale: number) => Icon;
	type?: string;
};

type landmarkType = {
	name: string;
	coord: LatLngTuple;
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
		name: '洪四川運動廣場',
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
		name: '人文社會科學院',
		coord: [22.735200265860797, 120.28150837452102],
		icon: humanities,
		type: 'building',
	},
	{
		name: '綜合大樓',
		coord: [22.731251780779072, 120.27731961637429],
		icon: complex,
		type: 'building',
	},
	{
		name: '工學院',
		coord: [22.732480598132806, 120.27646762863279],
		icon: eng,
		type: 'building',
	},
	{
		name: '理學院',
		coord: [22.73544149855268, 120.28608878661407],
		icon: science,
		type: 'building',
	},
	{
		name: '管理學院',
		coord: [22.732534910380707, 120.28753053179393],
		icon: business,
		type: 'building',
	},
	{
		name: '風車',
		coord: [22.732785105479525, 120.28078406767438],
		icon: windmill,
		type: 'architect',
	},
	{
		name: '風車',
		coord: [22.735734671293876, 120.28397646111544],
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
		coord: [22.734222003715143, 120.28305178066464],
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
		coord: [22.734523809569517, 120.28929596307852],
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
		coord: [22.734301877459004, 120.28619248924336],
		icon: poem,
		type: 'architect',
	},
];

const motorcycleEntrances: landmarkType[] = [
	{
		name: '工院宿舍機車停車場',
		coord: [22.733429317516652, 120.27540297074601],
	},
	{ name: '綜合機車停車場', coord: [22.73016146748817, 120.27808180459448] },
	{ name: '網球場機車停車場', coord: [22.73079851197864, 120.2780488363561] },
	{
		name: '校門口機車停車場',
		coord: [22.73213995825555, 120.28439924024235],
	},
	{
		name: '法學院機車停車場',
		coord: [22.732306378876817, 120.28716217858995],
	},
	{
		name: '管學院機車停車場',
		coord: [22.732469276566665, 120.28974993411838],
	},
	{
		name: '理學院機車停車場',
		coord: [22.736237927830867, 120.29021463896562],
	},
];

const courts: locationsType[] = [
	{
		name: '工學院籃球場',
		coord: [22.73283680841388, 120.276960431538],
		icon: basketball,
	},
	{
		name: '綜合籃球場',
		coord: [22.732011148828633, 120.27758251895976],
		icon: basketball,
	},
	{
		name: '網球場',
		coord: [22.73124331024736, 120.27801575971108],
		icon: tennis,
	},
	{
		name: '木球場',
		coord: [22.736202122406592, 120.2777904263894],
		icon: woodball,
	},
	{
		name: '棒球場',
		coord: [22.7320605129615, 120.27874808797417],
		icon: baseball,
	},
	{
		name: '操場',
		coord: [22.735587647065664, 120.27996681796827],
		icon: track,
	},
	{
		name: '宿舍排球場',
		coord: [22.73453757958894, 120.27741085989268],
		icon: volleyball,
	},
];

const dorms: locationsType[] = [
	{
		name: '學生第一宿舍',
		coord: [22.735563904321157, 120.27844313738727],
		icon: dorm,
	},
	{
		name: '學生第二宿舍',
		coord: [22.736087553857615, 120.27866641650805],
		icon: dorm,
	},
];

type openHoursType = {
	open: string;
	close: string;
};

type convenienceStoreType = locationsType & {
	openHours: {
		sunday: openHoursType;
		monday: openHoursType;
		tuesday: openHoursType;
		wednesday: openHoursType;
		thursday: openHoursType;
		friday: openHoursType;
		saturday: openHoursType;
	};
};

const convenienceStores: convenienceStoreType[] = [
	{
		name: '第二宿舍全家便利商店',
		coord: [22.73589696572668, 120.27843841083529],
		icon: familymart,
		openHours: {
			monday: { open: '8:00', close: '23:00' },
			tuesday: { open: '8:00', close: '23:00' },
			wednesday: { open: '8:00', close: '23:00' },
			thursday: { open: '8:00', close: '23:00' },
			friday: { open: '8:00', close: '21:00' },
			saturday: { open: '8:00', close: '21:00' },
			sunday: { open: '8:00', close: '21:00' },
		},
	},
];

export { locations, motorcycleEntrances, courts, dorms, convenienceStores };

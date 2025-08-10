const NUKubikeNames = [
	'YouBike2.0_高雄大學',
	'YouBike2.0_大學西路口(第一綜合大樓)',
	'YouBike2.0_高雄大學理學院南側',
	'YouBike2.0_高雄大學社科院西側',
	'YouBike2.0_高雄大學第一宿舍東側',
	'YouBike2.0_高雄大學(大學西路側)',
	'YouBike2.0_高雄大學管理學院',
	'YouBike2.0_高雄大學(大學南路側)',
	'YouBike2.0_高雄大學行政大樓',
	'YouBike2.0_高雄大學活動中心',
];

const fetchUbike = async () => {
	const res = await (
		await fetch(
			'https://api.kcg.gov.tw/api/service/Get/b4dd9c40-9027-4125-8666-06bef1756092',
			{ next: { revalidate: 60 } }
		)
	).json();

	const stations: UBikeStation[] = res.data.data.retVal;
	const filtered = stations.filter((station) =>
		NUKubikeNames.includes(station.sna)
	);

	return filtered;
};

export default fetchUbike;

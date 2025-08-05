type classroomType = {
	id: string;
	name: string;
	spotId: string;
};

type spotDataType = {
	id: string;
	name: string;
	description: string;
	image: string;
	lat: number;
	lng: number;
	classrooms: classroomType[];
};

type UBikeStation = {
	scity: string;
	scityen: string;
	sna: string;
	sarea: string;
	ar: string;
	snaen: string;
	sareaen: string;
	aren: string;
	sno: string;
	tot: string;
	sbi: string;
	mday: string;
	lat: string;
	lng: string;
	bemp: string;
	act: number;
	sbi_detail: {
		yb2: string;
		eyb: string;
	};
};

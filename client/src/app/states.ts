import { create } from 'zustand';

import { LatLngTuple } from 'leaflet';

type swStateType = {
	buildingSW: boolean;
	ubikeSW: boolean;
	courtSW: boolean;
	entranceSW: boolean;
	atmSW: boolean;
	aedSW: boolean;
	architectSW: boolean;
	toggle: (key: keyof swStateType) => void;
};

type navStateType = {
	navMode: boolean;
	setNavMode: (v: boolean) => void;
};

type destStateType = {
	dest: LatLngTuple[];
	setDest: (v: LatLngTuple[]) => void;
	addDest: (v: LatLngTuple) => void;
	rmDest: (v: LatLngTuple) => void;
};

type scaleType = {
	scale: number;
	setScale: (v: number) => void;
};

export const useSwStore = create<swStateType>()((set) => ({
	buildingSW: true,
	ubikeSW: false,
	courtSW: false,
	entranceSW: false,
	atmSW: false,
	aedSW: false,
	architectSW: false,
	toggle: (key) => set((state) => ({ [key]: !state[key] })),
}));

export const useNavStore = create<navStateType>()((set) => ({
	navMode: false,
	setNavMode: (val) => set(() => ({ navMode: val })),
}));

export const useDestStore = create<destStateType>()((set) => ({
	dest: [],
	setDest: (v) => set(() => ({ dest: v })),
	addDest: (v) => set((state) => ({ dest: [...state.dest, v] })),
	rmDest: (v) =>
		set((state) => ({
			dest: state.dest.filter((d) => d[0] !== v[0] || d[1] !== v[1]),
		})),
}));

export const useScaleStore = create<scaleType>()((set) => ({
	scale: 0,
	setScale: (v) => set({ scale: v }),
}));

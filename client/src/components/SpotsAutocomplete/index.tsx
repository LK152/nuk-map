'use client';

import { AutoComplete } from 'primereact/autocomplete';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string): Promise<spotDataType[]> =>
	fetch(url, { cache: 'no-store' }).then((res) => res.json());


type SuggestItem = {
	name: string;
	spot: spotDataType; 
	kind: 'spot' | 'classroom';
};

const SpotsAutocomplete = ({
  	onSelect,
}: {
  	onSelect: (spot: spotDataType | null) => void;
}) => {
	const base = process.env.NEXT_PUBLIC_SERVER_BASE || '';
	const { data: spots, error } = useSWR<spotDataType[]>(
		base ? `${base}/spots` : '/spots',
		fetcher
	);

	const [focus, setFocus] = useState<boolean>(false);
	const [filteredSpots, setFilteredSpots] = useState<SuggestItem[]>([]);
	const [selectedSpot, setSelectedSpot] = useState<SuggestItem | null>(null);

	const normIncludes = (s: string, k: string) => s.toLowerCase().includes(k.toLowerCase());

	const buildSuggestions = useCallback(
		(query: string): SuggestItem[] => {
		if (!spots) return [];
		const q = query.trim();
		if (!q) return [];

		// 空白或 + 分隔："工學院 201"、"工學院+201"
		const parts = q.split(/[\s+]+/).filter(Boolean);

		const byBuildingOnly = (k: string): SuggestItem[] =>
			spots
			.filter((s) => normIncludes(s.name, k))
			.map<SuggestItem>((s) => ({ name: s.name, spot: s, kind: 'spot' }));

		const byClassroomOnly = (k: string): SuggestItem[] => {
			const items: SuggestItem[] = [];
			for (const s of spots) {
			const rooms = s.classrooms ?? [];
			for (const r of rooms) {
				if (normIncludes(r.name, k)) {
				items.push({ name: `${s.name} › ${r.name}`, spot: s, kind: 'classroom' });
				}
			}
			}
			return items;
		};

		const byPair = (a: string, b: string): SuggestItem[] => {
			const items: SuggestItem[] = [];
			for (const s of spots) {
				const rooms = s.classrooms ?? [];
				const matchAinBuilding = normIncludes(s.name, a);
				const matchBinBuilding = normIncludes(s.name, b);
				const matchAinClassroom = rooms.some((r) => normIncludes(r.name, a));
				const matchBinClassroom = rooms.some((r) => normIncludes(r.name, b));

				if ((matchAinBuilding && matchBinClassroom) || (matchBinBuilding && matchAinClassroom)) {
					for (const r of rooms) {
						if (normIncludes(r.name, a) || normIncludes(r.name, b)) {
							items.push({ name: `${s.name} › ${r.name}`, spot: s, kind: 'classroom' });
						}
					}
				}
			}
			return items;
		};

		let result: SuggestItem[] = [];
		if (parts.length >= 2) {
			result = byPair(parts[0], parts[1])
			.concat(byBuildingOnly(parts[0]), byBuildingOnly(parts[1]))
			.concat(byClassroomOnly(parts[0]), byClassroomOnly(parts[1]));
		} else {
			result = byBuildingOnly(parts[0]).concat(byClassroomOnly(parts[0]));
		}

		const seen = new Set<string>();
		const uniq: SuggestItem[] = [];
		for (const it of result) {
			if (!seen.has(it.name)) {
			seen.add(it.name);
			uniq.push(it);
			}
			if (uniq.length >= 30) break;
		}
		return uniq;
		},[spots]
	);

	const search = (event: { query: string }) => {
		setFilteredSpots(buildSuggestions(event.query));
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && selectedSpot) {
		onSelect(selectedSpot.spot);
		setSelectedSpot(null);
		}
	};

	return (
		<div
			className={`fixed rounded-full top-8 left-5 desktop:left-[50vw] desktop:translate-x-[-50%] z-[990] desktop:w-[400px] bg-white ${
				focus ? 'opacity-100' : 'opacity-50'
			} ${error && 'invisible'}`}
		>
		<AutoComplete
			aria-label='Spots Search'
			inputClassName='caret-black text-black desktop:w-[400px] p-3 text-lg rounded-full'
			panelClassName='bg-white'
			value={selectedSpot}
			suggestions={filteredSpots}
			completeMethod={search}
			field='name'
			onChange={(e) => {
				setSelectedSpot(e.value as SuggestItem | null);
			}}
			onSelect={(e) => {
				const item = e.value as SuggestItem;
				setSelectedSpot(item);
				onSelect(item.spot);
				setSelectedSpot(null);
			}}
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			placeholder='搜尋建築物或教室（可輸入：建築物+教室）'
			onKeyDown={onKeyDown}
		/>
		</div>
	);
};

export default SpotsAutocomplete;

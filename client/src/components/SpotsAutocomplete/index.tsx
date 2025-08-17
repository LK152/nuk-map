'use client';

import { AutoComplete } from 'primereact/autocomplete';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string): Promise<spotDataType[]> =>
	fetch(url).then((res) => res.json());

const SpotsAutocomplete = ({
	onSelect,
}: {
	onSelect: (spot: spotDataType | null) => void;
}) => {
	const { data: spots, error } = useSWR<spotDataType[]>(
		'http://localhost:8888/spots',
		fetcher
	);

	const [focus, setFocus] = useState<boolean>(false);
	const [filteredSpots, setFilteredSpots] = useState<spotDataType[]>([]);
	const [selectedSpot, setSelectedSpot] = useState<spotDataType | null>(null);

	const search = (event: { query: string }) => {
		if (!spots) return;

		const results = spots.filter((spot) =>
			spot.name.toLowerCase().includes(event.query.toLowerCase())
		);
		setFilteredSpots(results);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && selectedSpot) {
			const foundSpot =
				spots?.find((obj) => obj.name === selectedSpot.name) ?? null;
			onSelect(foundSpot);
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
					setSelectedSpot(e.value);
				}}
				onSelect={(e) => {
					const spot = e.value as spotDataType;
					setSelectedSpot(spot);
					onSelect(spot);
					setSelectedSpot(null);
				}}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				placeholder='搜尋地點'
				onKeyDown={onKeyDown}
			/>
		</div>
	);
};

export default SpotsAutocomplete;

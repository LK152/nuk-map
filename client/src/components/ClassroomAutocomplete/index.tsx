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
	const classrooms =
		spots?.flatMap((spot) => spot.classrooms.map((c) => c.name)) ?? [];

	const [searchVal, setSearchVal] = useState<string>('');
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const search = (event: { query: string }) => {
		if (!spots) return;

		const results = classrooms.filter((name) =>
			name.toLowerCase().includes(event.query.toLowerCase())
		);
		setSuggestions(results);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && searchVal) {
			const foundSpot =
				spots?.find((obj) =>
					obj.classrooms.find(
						(classroom) => classroom.name === searchVal
					)
				) ?? null;
			onSelect(foundSpot);
		}
	};

	return (
		<div className={`w-full ${error ? 'invisible' : ''}`}>
			<AutoComplete
				aria-label='Classroom Search'
				inputClassName='w-full caret-black text-black p-4 text-lg border-1 border rounded'
				panelClassName='bg-white'
				value={searchVal}
				suggestions={suggestions}
				completeMethod={search}
				onChange={(e) => {
					setSearchVal(e.value);
				}}
				onSelect={(e) => {
					setSearchVal(e.value);
					const foundSpot =
						spots?.find((obj) =>
							obj.classrooms.find(
								(classroom) => classroom.name === e.value
							)
						) ?? null;
					onSelect(foundSpot);
				}}
				placeholder='查尋教室'
				onKeyDown={onKeyDown}
			/>
		</div>
	);
};

export default SpotsAutocomplete;

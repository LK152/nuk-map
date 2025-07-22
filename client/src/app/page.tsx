'use client';

import Search from '@/components/Search';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(
	() => import('@/components/Map').then((component) => component),
	{ ssr: false }
);

const Home = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [focused, setFocus] = useState<boolean>(false);

	return (
		<>
			<div
				className={`fixed rounded-full w-[400px] top-8 right-[50vw] translate-x-[50%] z-[1000] bg-white flex items-center ${
					focused ? 'opacity-100' : 'opacity-50'
				}`}
			>
				{!focused && searchValue == '' && (
					<span className='pi pi-search text-xl fixed left-2.5'></span>
				)}
				<Search
					className='w-full'
					inputClassName='w-full p-3 text-lg rounded-full'
                    panelClassName='bg-white rounded-full'
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					setFocus={setFocus}
				/>
			</div>
			<Map />
		</>
	);
};

export default Home;

import { AutoComplete } from 'primereact/autocomplete';
import { useState } from 'react';

const Search = ({
	searchValue,
	setSearchValue,
}: {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const [focused, setFocus] = useState<boolean>(false);

	return (
		<div
			className={`fixed rounded-full w-[400px] top-8 right-[50vw] translate-x-[50%] z-[1000] bg-white flex items-center ${
				focused ? 'opacity-100' : 'opacity-50'
			}`}
		>
			{(!focused && searchValue == '') && (
				<span className='pi pi-search text-xl fixed left-2.5'></span>
			)}
			<AutoComplete
				value={searchValue}
				onChange={(e) => setSearchValue(e.value)}
				className='w-full'
				inputClassName='w-full p-3 text-lg rounded-full'
				panelClassName='bg-white rounded-full'
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
		</div>
	);
};

export default Search;

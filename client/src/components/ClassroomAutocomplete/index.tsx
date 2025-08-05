import { AutoComplete } from 'primereact/autocomplete';

const ClassroomAutocomplete = () => {
	return (
		<AutoComplete
			inputClassName='caret-black text-black w-[120px] p-3 text-lg border-1 border rounded'
			panelClassName='bg-white'
			placeholder='搜尋教室'
		/>
	);
};

export default ClassroomAutocomplete;

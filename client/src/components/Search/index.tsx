import { AutoComplete } from 'primereact/autocomplete';

const Search = ({
	searchValue,
	className,
	inputClassName,
	panelClassName,
	setSearchValue,
	setFocus,
}: {
	searchValue: string;
	className?: string;
	inputClassName?: string;
	panelClassName?: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	setFocus?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<AutoComplete
			value={searchValue}
			onChange={(e) => setSearchValue(e.value)}
			className={className}
			inputClassName={inputClassName}
			panelClassName={panelClassName}
			onFocus={() => setFocus && setFocus(true)}
			onBlur={() => setFocus && setFocus(false)}
		/>
	);
};

export default Search;

import './menu.css';
import { useState } from 'react';
import Switch from 'react-switch';

const Menu = ({
	architectSW,
	toggleArchitectSW,
}: {
	architectSW: boolean;
	toggleArchitectSW: () => void;
}) => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const toggleClick = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<div
				onClick={toggleClick}
				className={`fixed top-8 right-8 w-14 h-14 rounded-full bg-white z-[1001] flex flex-col items-center justify-center cursor-pointer menuButton ${
					menuOpen ? 'opacity-100' : 'opacity-50'
				}`}
			>
				<div
					className={`bg-black w-8 h-1.5 rounded opacity-80 ${
						menuOpen ? 'menuClicked1' : 'menu'
					}`}
				></div>
				<div
					className={`bg-black w-8 h-1.5 rounded opacity-80 my-1 ${
						menuOpen ? 'menuClicked2' : 'menu'
					}`}
				></div>
				<div
					className={`bg-black w-8 h-1.5 rounded opacity-80 ${
						menuOpen ? 'menuClicked3' : 'menu'
					}`}
				></div>
			</div>
			<div
				className={`fixed flex items-center flex-col bg-white top-0 right-0 w-[200px] h-[100vh] z-[1000] opacity-80 ${
					menuOpen ? 'sidebarClicked' : 'sidebar'
				}`}
			>
				<div className='flex items-center mt-[100px]'>
					<span className='text-sm p-1'>顯示裝置藝術</span>
					<Switch
						checked={architectSW}
						onChange={toggleArchitectSW}
					/>
				</div>
			</div>
		</>
	);
};

export default Menu;

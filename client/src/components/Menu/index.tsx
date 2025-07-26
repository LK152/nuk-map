import './menu.css';
import { useState } from 'react';
import Switch from 'react-switch';
import Search from '../Search';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const Menu = ({
	architectSW,
	toggleArchitectSW,
}: {
	architectSW: boolean;
	toggleArchitectSW: () => void;
}) => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [classroom, setClassroom] = useState<string>('');
	const [aboutDialog, setAboutDialog] = useState<boolean>(false);

	const toggleClick = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<div
				onClick={toggleClick}
				className={`fixed top-6 right-6 w-14 h-14 rounded-full bg-white z-[1001] flex flex-col items-center justify-center cursor-pointer menuButton ${
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
				className={`fixed flex items-center flex-col bg-white top-0 right-0 w-[300px] h-[100vh] z-[1000] opacity-80 ${
					menuOpen ? 'sidebarClicked' : 'sidebar'
				}`}
			>
				<div className='flex items-center mt-[100px]'>
					<p className='text-black text-sm whitespace-nowrap p-1'>
						搜尋教室
					</p>
					<Search
						className='border-2 border-black rounded mx-2'
						inputClassName='caret-black text-black w-[120px] p-1 text-lg'
						searchValue={classroom}
						setSearchValue={setClassroom}
					/>
				</div>
				<div className='flex items-center my-5'>
					<p className='text-black text-sm p-1'>顯示裝置藝術</p>
					<Switch
						checked={architectSW}
						onChange={toggleArchitectSW}
					/>
				</div>
				<div className='absolute bottom-10'>
					<Button
						label='關於我們'
						onClick={() => setAboutDialog(true)}
					/>
					<Dialog
						header='關於我們'
						className='w-[50%] bg-white rounded p-8'
						visible={aboutDialog}
						onHide={() => {
							if (!aboutDialog) return;
							setAboutDialog(false);
						}}
					>
						<p className='m-0'>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore
							eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum.
						</p>
					</Dialog>
				</div>
			</div>
		</>
	);
};

export default Menu;

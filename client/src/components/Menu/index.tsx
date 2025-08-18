import './menu.css';
import { useState } from 'react';
import Switch from 'react-switch';
import { Button } from 'primereact/button';
import ClassroomAutocomplete from '../ClassroomAutocomplete';
import { useNavStore, useSwStore } from '../../lib/states';
import About from '@components/About';

const Menu = ({ jumpTo }: { jumpTo: (spot: spotDataType | null) => void }) => {
	const {
		entranceSW,
		courtSW,
		buildingSW,
		architectSW,
		atmSW,
		aedSW,
		ubikeSW,
		toggle,
	} = useSwStore();
	const { navMode, setNavMode } = useNavStore();

	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [aboutDialog, setAboutDialog] = useState<boolean>(false);

	const toggleClick = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<div
				onClick={toggleClick}
				className={`fixed top-7 right-2 w-14 h-14 rounded-full bg-transparent desktop:bg-white z-[1000] flex flex-col items-center justify-center cursor-pointer menuButton ${
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
				className={`fixed flex items-center flex-col bg-white top-0 right-0 w-full desktop:w-[320px] h-[100vh] z-[999] overflow-scroll desktop:overflow-hidden opacity-80 ${
					menuOpen ? 'sidebarClicked' : 'sidebar'
				}`}
			>
				<p className='text-black font-semibold desktop:text-2xl mt-12 desktop:mt-[100px] mb-4 self-start ml-8'>
					教室到底在哪...
				</p>
				<div className='flex justify-center w-full mb-6'>
					<div className='w-[80%]'>
						<ClassroomAutocomplete onSelect={jumpTo} />
					</div>
				</div>
				<p className='text-black font-semibold desktop:text-2xl mb-2 self-start ml-8'>
					導航模式
				</p>
				<div className='flex items-center justify-between w-[80%] my-4'>
					<p className='text-black text-lg'>導航</p>
					<Switch
						checked={navMode}
						onChange={() => setNavMode(!navMode)}
					/>
				</div>
				<p className='text-black font-semibold desktop:text-2xl mb-2 self-start ml-8'>
					想看什麼？
				</p>
				<div className='flex items-center justify-between w-[80%] my-4'>
					<p className='text-black text-lg'>顯示大樓</p>
					<Switch
						checked={buildingSW}
						onChange={() => toggle('buildingSW')}
					/>
				</div>
				<div className='flex items-center justify-between w-[80%] my-3'>
					<p className='text-black text-lg'>顯示UBIKE站點</p>
					<Switch
						checked={ubikeSW}
						onChange={() => toggle('ubikeSW')}
					/>
				</div>
				<div className='flex items-center justify-between w-[80%] my-3'>
					<p className='text-black text-lg'>顯示機車停車場入口</p>
					<Switch
						checked={entranceSW}
						onChange={() => toggle('entranceSW')}
					/>
				</div>
				<div className='flex items-center justify-between w-[80%] my-3'>
					<p className='text-black text-lg'>顯示球場</p>
					<Switch
						checked={courtSW}
						onChange={() => toggle('courtSW')}
					/>
				</div>
				<div className='flex items-center justify-between w-[80%] my-3'>
					<p className='text-black text-lg'>顯示ATM</p>
					<Switch checked={atmSW} onChange={() => toggle('atmSW')} />
				</div>
				<div className='flex items-center justify-between w-[80%] my-3'>
					<p className='text-black text-lg'>顯示AED</p>
					<Switch checked={aedSW} onChange={() => toggle('aedSW')} />
				</div>
				<div className='flex items-center justify-between w-[80%] my-3'>
					<p className='text-black text-lg'>顯示裝置藝術</p>
					<Switch
						checked={architectSW}
						onChange={() => toggle('architectSW')}
					/>
				</div>
				<div className='text-black mt-auto p-10'>
					<Button
						label='關於我們'
						onClick={() => {
							if (window.innerWidth <= 440) setMenuOpen(false);
							setAboutDialog(true);
						}}
					/>
				</div>
			</div>
			<About aboutDialog={aboutDialog} setAboutDialog={setAboutDialog} setMenuOpen={setMenuOpen} />
		</>
	);
};

export default Menu;

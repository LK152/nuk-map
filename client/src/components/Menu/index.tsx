import './menu.css';
import { useState } from 'react';
import Switch from 'react-switch';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ClassroomAutocomplete from '../ClassroomAutocomplete';
import { useNavStore, useSwStore } from '@app/states';

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
				className={`fixed flex items-center flex-col bg-white top-0 right-0 w-[90vw] max-w-[320px] h-[100vh] z-[1000] opacity-80 ${
					menuOpen ? 'sidebarClicked' : 'sidebar'
				}`}
			>
				<p className='text-black font-semibold text-2xl mt-[100px] mb-4 self-start ml-8'>
					教室到底在哪...
				</p>
				<div className='flex justify-center w-full mb-6'>
					<div className='w-[80%]'>
						<ClassroomAutocomplete onSelect={jumpTo} />
					</div>
				</div>
				<p className='text-black font-semibold text-2xl mb-4 self-start ml-8'>
					導航模式
				</p>
				<div className='flex items-center justify-between w-[80%] my-3'>
					<p className='text-black text-lg'>導航</p>
					<Switch
						checked={navMode}
						onChange={() => setNavMode(!navMode)}
					/>
				</div>
				<p className='text-black font-semibold text-2xl mb-4 self-start ml-8'></p>
				<p className='text-black font-semibold text-2xl mb-4 self-start ml-8'>
					想看什麼？
				</p>
				<div className='flex items-center justify-between w-[80%] my-3'>
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
						<pre className="font-mono text-sm whitespace-pre-wrap">
							{`FENG   | 後端勇者    | 力量: ★★★   | 智慧: ★★★★★ | 技能: 程式魔法、資料結構斬擊
							  貓貓   | UI/UX魔法師 | 美感: ★★★★★ | 技術: ★★★   | 技能: 介面附魔、色彩調和
							  LK     | 前端刺客    | 速度: ★★★★  | 靈活: ★★★★★ | 技能: 動畫連擊、互動暗殺
							  JERRY  | 躺分大魔王  | 防禦: ★★★★  | 臉皮: ★★★★  | 技能: 輔助回血、戰場奶媽`}
								</pre>

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

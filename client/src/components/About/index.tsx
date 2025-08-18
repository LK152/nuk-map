import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction } from 'react';

const About = ({
	aboutDialog,
	setAboutDialog,
	setMenuOpen,
}: {
	aboutDialog: boolean;
	setAboutDialog: Dispatch<SetStateAction<boolean>>;
	setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<Dialog
			className='desktop:w-[80%] bg-white rounded p-8 border-2'
			visible={aboutDialog}
			onHide={() => {
				if (window.innerWidth <= 440) setMenuOpen(true);
				setAboutDialog(false);
			}}
			dismissableMask
			showCloseIcon={false}
		>
			<div className='flex flex-col items-center'>
				<h1 className='text-black text-4xl font-WenKaiMonoTCBold'>
					關於我們
				</h1>
				<p className='text-black text-xl my-2 font-WenKaiMonoTCLight p-4'>
					<h2 className='text-black text-2xl font-WenKaiMonoTCBold mt-2'>
						我們的動機
					</h2>
					身為資工系的大三學生，我們在校園生活中常常遇到「資訊分散、找不到教室、
					錯過活動」等問題。這讓我們意識到：如果能善用資訊整合與設計思維，
					就能讓校園生活變得更便利。這份動機驅使我們組成團隊，嘗試用自己的專長
					去改善我們每天都會面對的問題。
					<h2 className='text-black text-2xl font-WenKaiMonoTCBold mt-2'>
						團隊理念
					</h2>
					我們相信「技術的價值不只在於程式碼，而是在於解決真實需求」。
					所以我們的專案目標，不只是完成課堂作業，而是能真正幫助到同學，
					讓大家在校園中少一點迷惘，多一點效率與安心。 我們的展望
					我們希望這份專案不僅是一次練習，更是往後持續改進的起點。
					未來我們想把它推廣給更多同學使用，並從回饋中不斷迭代，
					讓它真正成為「大家都覺得有幫助」的校園工具
					<h2 className='text-black text-2xl font-WenKaiMonoTCBold mt-2'>
						成員
					</h2>
					劉經晢 徐御丰 吳俊霆 陳彥融
				</p>
			</div>
		</Dialog>
	);
};

export default About;

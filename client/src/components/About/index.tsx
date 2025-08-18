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
			className=' bg-white rounded p-8 border-2'
			visible={aboutDialog}
			onHide={() => {
				if (window.innerWidth <= 440) setMenuOpen(true);
				setAboutDialog(false);
			}}
			dismissableMask
			showCloseIcon={false}
		>
			<div className='flex flex-col items-center'>
				<h1 className='text-black text-4xl font-WenKaiMonoTCBold'>關於我們</h1>
				<p className='text-black text-xl my-8 font-WenKaiMonoTCRegular p-4'>
					LK | 前端刺客 | 速度: ★★★★ | 靈活: ★★★★★ | 技能:
					動畫連擊、互動暗殺
					<br />
					FENG | 後端勇者 | 力量: ★★★ | 智慧: ★★★★★ | 技能:
					程式魔法、資料結構斬擊
					<br />
					貓貓 | UI/UX魔法師 | 美感: ★★★★★ | 技術: ★★★ | 技能:
					介面附魔、色彩調和
					<br />
					JERRY | 大魔王 | 防禦: ★★★★ | 臉皮: ★★★★ | 技能:
					輔助回血、戰場奶媽
				</p>
			</div>
		</Dialog>
	);
};

export default About;

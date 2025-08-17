import localFont from 'next/font/local';

export const WenKaiMonoTC = localFont({
	src: [
		{
			path: '/fonts/LXGWWenKaiMonoTC-Light.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '/fonts/LXGWWenKaiMonoTC-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '/fonts/LXGWWenKaiMonoTC-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-WenKaiMonoTC',
});

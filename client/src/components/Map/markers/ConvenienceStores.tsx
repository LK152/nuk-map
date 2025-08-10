import { useDestStore, useScaleStore } from '@app/states';
import { convenienceStores } from '@data/locations';
import { coordExists } from '@func/Routing';
import { Button } from 'primereact/button';
import { Marker, Popup } from 'react-leaflet';

const ConvenienceStores = () => {
	const { scale } = useScaleStore();
	const { dest, addDest, rmDest } = useDestStore();

	const time = new Date();
	const hour = time.getHours();
	const dayOfWeek = time.getDay();

	const checkConvenienceStoreOpen: (
		openTime: string,
		closingTime: string
	) => boolean = (openTime, closingTime) => {
		const openInt = parseInt(openTime.split(':')[0], 10);
		const closeInt = parseInt(closingTime.split(':')[0], 10);

		if (openInt < hour && hour > closeInt) return true;
		return false;
	};

	return (
		<>
			{convenienceStores.map(({ name, coord, icon, openHours }, idx) => {
				return (
					<Marker
						key={idx}
						position={coord}
						zIndexOffset={9999}
						icon={icon(scale)}
					>
						<Popup>
							{
								<div className='flex flex-col'>
									<h1 className='text-xl'>{name}</h1>
									{checkConvenienceStoreOpen(
										openHours[dayOfWeek].open,
										openHours[dayOfWeek].close
									) ? (
										<h2 className='text-[1rem] text-center text-green-500'>
											營業中
										</h2>
									) : (
										<h2 className='text-[1rem] text-center text-red-600'>
											休息中
										</h2>
									)}
									<p>
										營業時間:
										<br />
										<i>星期一 </i>
										{openHours[1].open}~{openHours[1].close}
										<br />
										<i>星期二 </i> {openHours[2].open}~
										{openHours[2].close}
										<br />
										<i>星期三 </i> {openHours[3].open}~
										{openHours[3].close}
										<br />
										<i>星期四 </i> {openHours[4].open}~
										{openHours[4].close}
										<br />
										<i>星期五 </i> {openHours[5].open}~
										{openHours[5].close}
										<br />
										<i>星期六 </i> {openHours[6].open}~
										{openHours[6].close}
										<br />
										<i>星期日 </i> {openHours[0].open}~
										{openHours[0].close}
									</p>
									{coordExists(dest, coord) ? (
										<Button
											className='bg-blue-500 text-white p-2 m-2 rounded-full opacity-80 hover:opacity-100 transition-opacity'
											label='刪除目的'
											onClick={() => rmDest(coord)}
										/>
									) : (
										<Button
											className='bg-blue-500 text-white p-2 m-2 rounded-full opacity-80 hover:opacity-100 transition-opacity'
											label='新增目的'
											onClick={() => addDest(coord)}
										/>
									)}
								</div>
							}
						</Popup>
					</Marker>
				);
			})}
		</>
	);
};

export default ConvenienceStores;

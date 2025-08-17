import { useDestStore, useScaleStore, useSwStore } from '../../../lib/states';
import { atms } from '@data/locations';
import { coordExists } from '@func/Routing';
import { Button } from 'primereact/button';
import { Marker, Popup } from 'react-leaflet';

const ATMs = () => {
	const { atmSW } = useSwStore();
	const { scale } = useScaleStore();
	const { dest, addDest, rmDest } = useDestStore();

	return (
		<>
			{atms.map(({ name, coord, icon }, idx) => {
				if (!atmSW) return null;

				return (
					<Marker
						key={idx}
						position={coord}
						icon={icon(scale)}
						zIndexOffset={1000}
					>
						<Popup>
							{
								<div className='flex flex-col'>
									<h1>{name}</h1>
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

export default ATMs;

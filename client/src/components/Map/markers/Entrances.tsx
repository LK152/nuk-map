import { useDestStore, useScaleStore, useSwStore } from '@app/states';
import { motorcycleEntrances } from '@data/locations';
import { coordExists } from '@func/Routing';
import { Button } from 'primereact/button';
import { Marker, Popup } from 'react-leaflet';
import { parking } from '../mapIcons';

const Entrances = () => {
	const { entranceSW } = useSwStore();
	const { scale } = useScaleStore();
	const { dest, addDest, rmDest } = useDestStore();

	return (
		<>
			{motorcycleEntrances.map(({ name, coord }, idx) => {
				if (!entranceSW) return null;

				return (
					<Marker key={idx} position={coord} icon={parking(scale)} zIndexOffset={1000}>
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

export default Entrances;

import { useDestStore, useScaleStore } from '@app/states';
import { dorms } from '@data/locations';
import { Marker, Popup } from 'react-leaflet';
import { Button } from 'primereact/button';
import { coordExists } from '@func/Routing';

const Dorms = () => {
	const { dest, addDest, rmDest } = useDestStore();
	const { scale } = useScaleStore();

	return (
		<>
			{dorms.map(({ name, coord, icon }, idx) => {
				return (
					<Marker key={idx} position={coord} icon={icon(scale)} zIndexOffset={1000}>
						<Popup>
							<h1>{name}</h1>
							{
								<div className='flex flex-col'>
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

export default Dorms;

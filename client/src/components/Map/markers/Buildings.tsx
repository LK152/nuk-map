import { useDestStore, useScaleStore, useSwStore } from '../../../lib/states';
import { locations } from '@data/locations';
import { Button } from 'primereact/button';
import { RefObject } from 'react';
import { Marker, Popup } from 'react-leaflet';

const Buildings = ({
	markerRefs,
}: {
	markerRefs: RefObject<Record<string, L.Marker>>;
}) => {
	const { buildingSW, architectSW } = useSwStore();
	const { scale } = useScaleStore();
	const { dest, addDest, rmDest } = useDestStore();

	return (
		<>
			{locations.map(({ name, coord, icon, type }, idx) => {
				if (
					(type === 'building' && !buildingSW) ||
					(type === 'architect' && !architectSW)
				) {
					return null;
				}

				return (
					<Marker
						key={idx}
						position={coord}
						icon={icon(scale * (type === 'architect' ? 0.6 : 1.2))}
						ref={(ref) => {
							if (ref) markerRefs.current[name] = ref;
						}}
						zIndexOffset={type === 'architect' ? 100 : 0}
					>
						<Popup>
							<div className='flex flex-col'>
								{name}
								{dest.includes(coord) ? (
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
						</Popup>
					</Marker>
				);
			})}
		</>
	);
};

export default Buildings;

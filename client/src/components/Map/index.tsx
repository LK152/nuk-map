'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import locations from './mapIcons';
import { useEffect, useState } from 'react';
import Menu from '../Menu';
import RoutingMachine from '@/func/Routing';
import { Button } from 'primereact/button';
import { LatLngTuple } from 'leaflet';

const Map = () => {
	const [dest, setDest] = useState<LatLngTuple[]>([]);
	const [scale, setScale] = useState<number>(0);
	const [architectSW, setArchitectSW] = useState<boolean>(false);

	const MapComponent = () => {
		const map = useMap();

		useEffect(() => {
			const onZoom = () => {
				const zoom = map.getZoom();
				const baseZoom = 16;
				const scale = Math.pow(2, zoom - baseZoom);
				setScale(scale);
			};
			map.on('zoom', onZoom);

			onZoom();

			return () => {
				map.off('zoom', onZoom);
			};
		}, [map]);

		return null;
	};

	const toggleArchitectSW = () => {
		setArchitectSW(!architectSW);
	};

	const addDest = (coord: LatLngTuple) => {
		setDest((prev) => [...prev, coord]);
        console.log(dest)
	};

	return (
		<div className='w-full h-[100vh]'>
			<MapContainer
				center={[22.73443796905454, 120.28443432939359]}
				minZoom={15}
				zoom={16}
				style={{ height: '100%', width: '100%' }}
			>
				<MapComponent />
				<RoutingMachine destinations={dest} />
				<TileLayer
					attribution='&copy; MapTiler & OpenStreetMap contributors'
					url='https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=eogDeLZuq3Kl0LRIL5JD'
				/>
				{locations.map(({ name, coord, icon, type }, idx) => {
					if (type === 'architect') {
						if (!architectSW) return null;
						return (
							<Marker
								key={idx}
								position={coord}
								icon={icon(scale * 0.6)}
							>
								<Popup>{name}</Popup>
							</Marker>
						);
					}
					return (
						<Marker
							key={idx}
							position={coord}
							icon={icon(scale * 1.2)}
						>
							<Popup>
								<div className='flex flex-col'>
									{name}
									<Button
										className='bg-blue-500 text-white p-2 m-2 rounded-full opacity-80 hover:opacity-100 transition-opacity'
										label='新增目的'
										onClick={() => addDest(coord)}
									/>
								</div>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
			<Menu
				architectSW={architectSW}
				toggleArchitectSW={toggleArchitectSW}
			/>
		</div>
	);
};

export default Map;

'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import locations from './mapIcons';
import { useEffect, useRef, useState } from 'react';
import Menu from '../Menu';
import RoutingMachine from '@/func/Routing';
import { Button } from 'primereact/button';
import { LatLngTuple } from 'leaflet';
import SpotsAutocomplete from '../SpotsAutocomplete';

const Map = () => {
	const mapRef = useRef<L.Map | null>(null);
	const markerRefs = useRef<Record<string, L.Marker>>({});

	const [dest, setDest] = useState<LatLngTuple[]>([]);
	const [scale, setScale] = useState<number>(0);
	const [architectSW, setArchitectSW] = useState<boolean>(false);

	const MapComponent = () => {
		const map = useMap();

		useEffect(() => {
			const onZoom = () => {
				const zoom = map.getZoom();
				const baseZoom = 16;
				const newScale = Math.pow(2, zoom - baseZoom);
				setScale((prev) => {
					if (prev !== newScale) return newScale;
					return prev;
				});
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
		console.log(dest);
	};

	const JumpTo = (spot: spotDataType | null) => {
		if (!spot) return;
		const marker = markerRefs.current[spot.name];
		if (
			!mapRef.current ||
			marker?.isPopupOpen()
		)
			return;

		mapRef.current.flyTo([spot.lat, spot.lng], 18, { duration: 0.4 });

		if (marker) setTimeout(() => marker.openPopup(), 600);
		else console.warn('Marker ref not found for spot:', spot.name);
	};

	return (
		<div className='w-full h-[100vh]'>
			<MapContainer
				center={[22.73443796905454, 120.28443432939359]}
				minZoom={15}
				zoom={16}
				style={{ height: '100%', width: '100%' }}
				ref={(ref) => {
					if (ref) mapRef.current = ref;
				}}
			>
				<MapComponent />
				<SpotsAutocomplete onSelect={JumpTo} />
				<RoutingMachine destinations={dest} />
				<TileLayer
					attribution='&copy; MapTiler & OpenStreetMap contributors'
					url='https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=eogDeLZuq3Kl0LRIL5JD'
				/>
				{locations.map(({ name, coord, icon, type }, idx) => {
					if (!architectSW && type === 'architect') return null;
					return (
						<Marker
							key={idx}
							position={coord}
							icon={icon(
								scale * (type === 'architect' ? 0.6 : 1.2)
							)}
							ref={(ref) => {
								if (ref) markerRefs.current[name] = ref;
							}}
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

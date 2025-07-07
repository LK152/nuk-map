'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import locations from './mapIcons';
import { useEffect, useState } from 'react';

const Map = () => {
	const [scale, setScale] = useState<number>(0);

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
	return (
		<div className='w-full h-[100vh]'>
			<MapContainer
				center={[22.73443796905454, 120.28443432939359]}
				minZoom={15}
				zoom={16}
				style={{ height: '100%', width: '100%' }}
			>
				<MapComponent />
				<TileLayer
					attribution='&copy; MapTiler & OpenStreetMap contributors'
					url='https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=eogDeLZuq3Kl0LRIL5JD'
				/>
				{locations.map(({ name, coord, icon, type }, idx) => (
					<Marker
						key={idx}
						position={coord}
						icon={icon(scale * (type === 'building' ? 1.2 : 0.6))}
					>
						<Popup>{name}</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
};

export default Map;

'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import Menu from '../Menu';
import RoutingMachine from '@func/Routing';
import { LatLngTuple } from 'leaflet';
import SpotsAutocomplete from '../SpotsAutocomplete';
import { CircleMarker, useMapEvents } from 'react-leaflet';
import { useDestStore, useNavStore, useScaleStore } from '@app/states';
import L from 'leaflet';
import Dorms from './markers/Dorms';
import Courts from './markers/Courts';
import Entrances from './markers/Entrances';
import ConvenienceStores from './markers/ConvenienceStores';
import Ubikes from './markers/Ubikes';
import Buildings from './markers/Buildings';
import AEDs from './markers/AEDs';
import ATMs from './markers/ATMs';

const Map = () => {
	const mapRef = useRef<L.Map | null>(null);
	const markerRefs = useRef<Record<string, L.Marker>>({});
	const { navMode, setNavMode } = useNavStore();
	const { dest, addDest, setDest } = useDestStore();
	const { scale, setScale } = useScaleStore();

	const [freePoints, setFreePoints] = useState<LatLngTuple[]>([]);

	useEffect(() => {
		if (!navMode) {
			setDest([]);
			setFreePoints([]);
		}
	}, [navMode, setDest]);

	useEffect(() => {
		if (!navMode && dest.length > 0) {
			setNavMode(true);
		}
	}, [dest, navMode, setNavMode]);

	const MapComponent = () => {
		const map = useMap();

		useEffect(() => {
			const onZoom = () => {
				const zoom = map.getZoom();
				const baseZoom = 16;
				const newScale = Math.pow(2, zoom - baseZoom);
				if (scale !== newScale) setScale(newScale);
			};
			map.on('zoom', onZoom);

			onZoom();

			return () => {
				map.off('zoom', onZoom);
			};
		}, [map]);

		return null;
	};

	const clearRoute = () => {
		setDest([]);
		setFreePoints([]);
		setNavMode(false);
	};

	const coordExists = (arr: LatLngTuple[], target: LatLngTuple): boolean => {
		return arr.some(([lat, lng]) => lat === target[0] && lng === target[1]);
	};

	const jumpTo = (spot: spotDataType | null) => {
		if (!spot) return;
		const marker = markerRefs.current[spot.name];
		if (!mapRef.current || marker?.isPopupOpen()) return;

		mapRef.current.flyTo([spot.lat, spot.lng], 18, { duration: 0.4 });

		if (marker) setTimeout(() => marker.openPopup(), 600);
		else console.warn('Marker ref not found for spot:', spot.name);
	};

	// Helper component to handle map clicks for adding up to 3 free points in navMode
	const MapClickHandler = ({
		onClick,
	}: {
		onClick: (latlng: L.LatLng) => void;
	}) => {
		useMapEvents({
			click(e) {
				onClick(e.latlng);
			},
		});

		return null;
	};

	return (
		<div className='w-full h-[100vh]'>
			<Menu jumpTo={jumpTo} />
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
				<SpotsAutocomplete onSelect={jumpTo} />
				<RoutingMachine destinations={dest} />
				{navMode && (
					<MapClickHandler
						onClick={(latlng) => {
							if (
								coordExists(freePoints, [
									latlng.lat,
									latlng.lng,
								])
							)
								return;
							if (freePoints.length >= 3) {
								setFreePoints((prev) => [
									...prev.slice(1),
									[latlng.lat, latlng.lng],
								]);
								setDest([
									...dest.slice(1),
									[latlng.lat, latlng.lng],
								]);
							} else {
								setFreePoints((prev) => [
									...prev,
									[latlng.lat, latlng.lng],
								]);
								addDest([latlng.lat, latlng.lng]);
							}
						}}
					/>
				)}
				<TileLayer
					attribution='&copy; MapTiler & OpenStreetMap contributors'
					url='https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=eogDeLZuq3Kl0LRIL5JD'
				/>

				{freePoints.map((p, i) => (
					<CircleMarker
						key={`fp-${i}`}
						center={p}
						radius={6}
						pathOptions={{
							color: '#2563eb',
							fillColor: '#2563eb',
							fillOpacity: 0.9,
						}}
					/>
				))}

				<Buildings markerRefs={markerRefs} />
				<Dorms />
				<Courts />
				<Entrances />
				<ConvenienceStores />
				<Ubikes />
				<AEDs />
                <ATMs />
                
			</MapContainer>

			{dest.length > 0 && (
				<button
					aria-label='結束導航'
					title='結束導航'
					onClick={clearRoute}
					className='fixed bottom-6 right-6 z-[1100] w-14 h-14 rounded-full bg-white border border-red-500 text-red-600 text-2xl shadow-md flex items-center justify-center hover:bg-red-50 active:scale-95 transition'
				>
					✕
				</button>
			)}
		</div>
	);
};

export default Map;

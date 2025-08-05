'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { parking, ubike } from './mapIcons';
import { courts, locations, motorcycleEntrances, dorms } from '@data/locations';
import { useEffect, useRef, useState } from 'react';
import Menu from '../Menu';
import RoutingMachine from '@func/Routing';
import { Button } from 'primereact/button';
import { LatLngTuple } from 'leaflet';
import SpotsAutocomplete from '../SpotsAutocomplete';
import fetchUbike from '@func/UbikeInfo';

const Map = () => {
	const mapRef = useRef<L.Map | null>(null);
	const markerRefs = useRef<Record<string, L.Marker>>({});

	const [dest, setDest] = useState<LatLngTuple[]>([]);
	const [scale, setScale] = useState<number>(0);
	const [buildingSW, setBuildingSW] = useState<boolean>(true);
	const [architectSW, setArchitectSW] = useState<boolean>(false);
	const [aedSW, setAedSW] = useState<boolean>(false);
	const [ubikeSW, setUbikeSW] = useState<boolean>(false);
	const [atmSW, setAtmSW] = useState<boolean>(false);
	const [ubikeData, setUbikeData] = useState<UBikeStation[] | null>(null);

	useEffect(() => {
		(async () => {
			const data = await fetchUbike();
			setUbikeData(data);
		})();
	}, []);

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

	const toggleAedSW = () => {
		setAedSW(!aedSW);
	};

	const toggleAtmSW = () => {
		setAtmSW(!atmSW);
	};

	const toggleUbikeSW = () => {
		setUbikeSW(!ubikeSW);
	};

	const toggleBuildingSW = () => {
		setBuildingSW(!buildingSW);
	};

	const addDest = (coord: LatLngTuple) => {
		setDest((prev) => [...prev, coord]);
		console.log(dest);
	};

	const rmDest = (coord: LatLngTuple) => {
		setDest((prev) =>
			prev.filter((d) => d[0] !== coord[0] || d[1] !== coord[1])
		);
	};

	const coordExists = (arr: LatLngTuple[], target: LatLngTuple): boolean => {
		return arr.some(([lat, lng]) => lat === target[0] && lng === target[1]);
	};

	const JumpTo = (spot: spotDataType | null) => {
		if (!spot) return;
		const marker = markerRefs.current[spot.name];
		if (!mapRef.current || marker?.isPopupOpen()) return;

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

				{dorms.map(({ name, coord, icon }, idx) => {
					return (
						<Marker key={idx} position={coord} icon={icon(scale)}>
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

				{courts.map(({ name, coord, icon }, idx) => {
					return (
						<Marker key={idx} position={coord} icon={icon(scale)}>
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

				{motorcycleEntrances.map(({ coord }, idx) => {
					return (
						<Marker
							key={idx}
							position={coord}
							icon={parking(scale)}
						>
							<Popup>
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

				{ubikeData &&
					ubikeData.map(
						({ sna, lat, lng, bemp, act, sbi_detail }, idx) => {
							if (!ubikeSW) return null;
							return (
								<Marker
									key={idx}
									position={[
										parseFloat(lat),
										parseFloat(lng),
									]}
									icon={ubike(scale)}
								>
									<Popup>
										{act ? (
											<div className='flex flex-col'>
												<h1 className='text-lg whitespace-nowrap'>
													{sna.replace(
														'YouBike2.0_',
														''
													)}
												</h1>
												<p className='text-md'>
													可還數量: {bemp}
													<br />
													普通車: {sbi_detail.yb2}
													<br />
													{parseInt(sbi_detail.eyb) >
													0
														? `電輔車: ${sbi_detail.eyb}`
														: null}
												</p>
												{coordExists(dest, [
													parseFloat(lat),
													parseFloat(lng),
												]) ? (
													<Button
														className='bg-blue-500 text-white p-2 m-2 rounded-full opacity-80 hover:opacity-100 transition-opacity'
														label='刪除目的'
														onClick={() =>
															rmDest([
																parseFloat(lat),
																parseFloat(lng),
															])
														}
													/>
												) : (
													<Button
														className='bg-blue-500 text-white p-2 m-2 rounded-full opacity-80 hover:opacity-100 transition-opacity'
														label='新增目的'
														onClick={() =>
															addDest([
																parseFloat(lat),
																parseFloat(lng),
															])
														}
													/>
												)}
											</div>
										) : (
											<h1>此站未運營</h1>
										)}
									</Popup>
								</Marker>
							);
						}
					)}

				{locations.map(({ name, coord, icon, type }, idx) => {
					if (!buildingSW && type === 'building') return null;
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
			</MapContainer>
			<Menu
				architectSW={architectSW}
				aedSW={aedSW}
				atmSW={atmSW}
				ubikeSW={ubikeSW}
				buildingSW={buildingSW}
				toggleArchitectSW={toggleArchitectSW}
				toggleAedSW={toggleAedSW}
				toggleAtmSW={toggleAtmSW}
				toggleUbikeSW={toggleUbikeSW}
				toggleBuildingSW={toggleBuildingSW}
				JumpTo={JumpTo}
			/>
		</div>
	);
};

export default Map;

'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { parking, ubike } from './mapIcons';
import {
	courts,
	locations,
	motorcycleEntrances,
	dorms,
	convenienceStores,
} from '@data/locations';
import { useEffect, useRef, useState } from 'react';
import Menu from '../Menu';
import RoutingMachine from '@func/Routing';
import { Button } from 'primereact/button';
import { LatLngTuple } from 'leaflet';
import SpotsAutocomplete from '../SpotsAutocomplete';
import fetchUbike from '@func/UbikeInfo';
import { CircleMarker, useMapEvents } from 'react-leaflet';

const Map = () => {
    //const time = new Date();
    //const hour = time.getHours();
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
	const [navMode, setNavMode] = useState<boolean>(true);
	const [freePoints, setFreePoints] = useState<LatLngTuple[]>([]);

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

	const clearRoute = () => {
		setDest([]);
		setFreePoints([]);
		setNavMode(false);
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
								setDest((prev) => [
									...prev.slice(1),
									[latlng.lat, latlng.lng],
								]);
							} else {
								setFreePoints((prev) => [
									...prev,
									[latlng.lat, latlng.lng],
								]);
								setDest((prev) => [
									...prev,
									[latlng.lat, latlng.lng],
								]);
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

				{motorcycleEntrances.map(({ name, coord }, idx) => {
					return (
						<Marker
							key={idx}
							position={coord}
							icon={parking(scale)}
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

				{convenienceStores.map(
					({ name, coord, icon, openHours }, idx) => {
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
											<h2 className={`text-[1rem] text-center`}>
												營業中
											</h2>
											<p>
												營業時間:
												<br />
												<i>星期一 </i>
												{openHours.monday.open}~{openHours.monday.close}
												<br />
												<i>星期二 </i>{' '}
												{openHours.tuesday.open}~{openHours.tuesday.close}
												<br />
												<i>星期三 </i>{' '}
												{openHours.wednesday.open}~{openHours.wednesday.close}
												<br />
												<i>星期四 </i>{' '}
												{openHours.thursday.open}~{openHours.thursday.close}
												<br />
												<i>星期五 </i>{' '}
												{openHours.friday.open}~{openHours.friday.close}
												<br />
												<i>星期六 </i>{' '}
												{openHours.saturday.open}~{openHours.saturday.close}
												<br />
												<i>星期日 </i>{' '}
												{openHours.sunday.open}~{openHours.sunday.close}
											</p>
											{coordExists(dest, coord) ? (
												<Button
													className='bg-blue-500 text-white p-2 m-2 rounded-full opacity-80 hover:opacity-100 transition-opacity'
													label='刪除目的'
													onClick={() =>
														rmDest(coord)
													}
												/>
											) : (
												<Button
													className='bg-blue-500 text-white p-2 m-2 rounded-full opacity-80 hover:opacity-100 transition-opacity'
													label='新增目的'
													onClick={() =>
														addDest(coord)
													}
												/>
											)}
										</div>
									}
								</Popup>
							</Marker>
						);
					}
				)}

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
									zIndexOffset={999}
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
				navMode={navMode}
				setNavMode={setNavMode}
			/>
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

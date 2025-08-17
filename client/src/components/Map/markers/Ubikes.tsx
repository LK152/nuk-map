import fetchUbike from '@func/UbikeInfo';
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { ubike } from '../mapIcons';
import { useDestStore, useScaleStore, useSwStore } from '../../../lib/states';
import { coordExists } from '@func/Routing';
import { Button } from 'primereact/button';

const Ubikes = () => {
	const { ubikeSW } = useSwStore();
	const { scale } = useScaleStore();
	const { dest, addDest, rmDest } = useDestStore();

	const [ubikeData, setUbikeData] = useState<UBikeStation[] | null>(null);

	useEffect(() => {
		(async () => {
			const data = await fetchUbike();
			setUbikeData(data);
		})();
	}, []);

	return (
		<>
			{ubikeData &&
				ubikeData.map(
					({ sna, lat, lng, bemp, act, sbi_detail }, idx) => {
						if (!ubikeSW) return null;
						return (
							<Marker
								key={idx}
								position={[parseFloat(lat), parseFloat(lng)]}
								icon={ubike(scale)}
								zIndexOffset={999}
							>
								<Popup>
									{act ? (
										<div className='flex flex-col'>
											<h1 className='text-lg whitespace-nowrap'>
												{sna.replace('YouBike2.0_', '')}
											</h1>
											<p className='text-md'>
												可還數量: {bemp}
												<br />
												普通車: {sbi_detail.yb2}
												<br />
												{parseInt(sbi_detail.eyb) > 0
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
		</>
	);
};

export default Ubikes;

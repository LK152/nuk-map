import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const JumpTo = ({ lat, lng }: { lat: number; lng: number }) => {
	const map = useMap();

	useEffect(() => {
		if (lat && lng) map.flyTo([lat, lng], 16, { duration: .6 });
	}, [lat, lng, map]);

    return null
};

export default JumpTo
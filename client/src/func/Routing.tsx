import 'leaflet-routing-machine';
import L, { LatLngTuple } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RoutingMachine = ({ destinations }: { destinations: LatLngTuple[] }) => {
	const map = useMap();

	useEffect(() => {
		if (!map) return;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: '/leaflet/marker-icon-2x.png',
			iconUrl: '/leaflet/marker-icon.png',
			shadowUrl: '/leaflet/marker-shadow.png',
		});

		const routingControl = L.Routing.control({
			waypoints: destinations.map((coords) => L.latLng(coords)),
			lineOptions: {
				styles: [{ color: '#6FA1EC', weight: 4 }],
			},
			show: false,
			addWaypoints: true,
			routeWhileDragging: true,
			draggableWaypoints: true,
			fitSelectedRoutes: true,
			showAlternatives: true,
		}).addTo(map);

		return () => {
			if (map) map.removeControl(routingControl);
		};
	}, [map, destinations]);

	return null;
};

export default RoutingMachine;

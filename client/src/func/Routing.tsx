import 'leaflet-routing-machine';
import L, { LatLngTuple } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const RoutingMachine = ({ destinations }: { destinations: LatLngTuple[] }) => {
	const map = useMap();

	useEffect(() => {
		if (!map || !(map as any)._controlCorners) return;

		L.Icon.Default.mergeOptions({
			iconRetinaUrl: '/leaflet/marker-icon-2x-red.png',
			iconUrl: '/leaflet/marker-icon-red.png',
			shadowUrl: '/leaflet/marker-shadow.png',
		});

		let routingControl: any;

		if (destinations.length >= 2) {
			map.whenReady(() => {
				routingControl = L.Routing.control({
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

				const container = routingControl.getContainer();
				if (container) container.style.display = 'none';
			});
		}

		return () => {
			if (routingControl) {
				try {
					map.removeControl(routingControl);
				} catch {}
			}
		};
	}, [map, destinations]);

	return null;
};

export default RoutingMachine;

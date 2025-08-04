import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface LineOptions {
      styles: L.PathOptions[];
    }

    interface AltLineOptions {
      styles: L.PathOptions[];
    }

    interface RoutingControlOptions extends L.ControlOptions {
      waypoints?: L.LatLng[];
      lineOptions?: LineOptions;
      altLineOptions?: AltLineOptions;
      plan?: L.Routing.Plan;
      routeWhileDragging?: boolean;
      routeDragInterval?: number;
      autoRoute?: boolean;
      useZoomParameter?: boolean;
      showAlternatives?: boolean;
      draggableWaypoints?: boolean;
      addWaypoints?: boolean;
      fitSelectedRoutes?: boolean;
      show?: boolean;
      collapsible?: boolean;
      createMarker?: (
        index: number,
        waypoint: L.LatLng,
        totalWaypoints: number
      ) => L.Marker | null;
    }

    class RoutingControl extends L.Control {
      getWaypoints(): L.LatLng[];
      setWaypoints(waypoints: L.LatLng[]): void;
      onAdd(map: L.Map): HTMLElement;
      onRemove(map: L.Map): void;
    }

    function control(options?: RoutingControlOptions): RoutingControl;

    class Plan {
      constructor(waypoints: L.LatLng[], options?: unknown);
    }
  }
}

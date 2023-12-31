import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = PUBLIC_MAPBOX_ACCESS_TOKEN;

export const DEFAULT_MAP_CENTER: [number, number] = [-98.58, 39.83];
export const DEFAULT_MAP_ZOOM = 3.5;
export const DEFAULT_MAP_STYLE = 'dark';
export const contextKey = 'map';

export default mapboxgl;

export function buildMap(
    container: string,
    style: 'light' | 'dark' = DEFAULT_MAP_STYLE,
    center: [number, number] = DEFAULT_MAP_CENTER,
    zoom: number = DEFAULT_MAP_ZOOM
): mapboxgl.Map {
    return new mapboxgl.Map({
        container,
        style: `mapbox://styles/mapbox/${style}-v11`,
        center,
        zoom,
        attributionControl: false,
        logoPosition: 'top-left'
    });
}
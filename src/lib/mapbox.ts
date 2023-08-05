import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = PUBLIC_MAPBOX_ACCESS_TOKEN;

export default mapboxgl;
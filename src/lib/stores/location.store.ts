import { browser } from "$app/environment";
import { DEFAULT_MAP_ZOOM } from "$lib/mapbox";
import { writable } from "svelte/store";

export interface UserCoordinates {
    lat: number;
    lng: number;
    zoom: number;
}

export const userCoordinates = writable<UserCoordinates | null>(null);
export const userCoordinatesLoaded = writable<boolean>(false);

export const getUserLocation = async () => {
    if (!browser) return;

    if (navigator.geolocation) {

        // Check permission
        const result = await navigator.permissions.query({ name: 'geolocation' });
        if (result.state === 'denied') {
            throw new Error("Geolocation permission denied");
        }

        navigator.geolocation.getCurrentPosition((position) => {
            userCoordinates.set({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 9
            });
            userCoordinatesLoaded.set(true);
            return;
        }, (error) => {
            console.log(error.message);
            userCoordinatesLoaded.set(true);
            throw new Error(error.message);
        });
    } else {
        throw new Error("Geolocation not supported");
    }
}



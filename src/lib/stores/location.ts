import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const userCoordinates = writable({
    lat: 0,
    lng: 0,
    zoom: 1
});

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
                zoom: 13
            });
            return;
        }, (error) => {
            console.log(error.message);
            throw new Error(error.message);
        });
    } else {
        throw new Error("Geolocation not supported");
    }
}



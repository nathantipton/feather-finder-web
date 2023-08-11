import { browser } from "$app/environment";
import { derived, writable, type Readable, type Writable } from "svelte/store";

export const DEFAULT_USER_COORDS_ZOOM = 9;

export interface UserCoordinates {
    lat: number;
    lng: number;
    zoom?: number;
}

export interface CoordinatesState {
    data: UserCoordinates | null;
    loading: boolean;
    error: string | null;
}

const initialState: CoordinatesState = {
    data: null,
    loading: false,
    error: null
};

const coordinatesState: Writable<CoordinatesState> = writable(initialState);


export const userCoordinates: Readable<UserCoordinates | null> = derived(
    coordinatesState,
    $state => $state.data
);

export const setLoading = (loading: boolean) => {
    coordinatesState.update(state => ({ ...state, loading }));
}

export const setError = (error: string) => {
    coordinatesState.update(state => ({ ...state, error, loading: false }));
}

export const setCoordinates = (coords: UserCoordinates) => {
    coordinatesState.update(state => ({ ...state, data: coords, loading: false }));
}

export const getUserLocation = async () => {

    return new Promise((resolve, reject) => {
        if (!browser) reject("Not in a browser environment");

        setLoading(true);

        if (navigator.geolocation) {
            navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
                if (permission.state === 'denied') {
                    reject("Geolocation permission denied");
                    return;
                } else {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const coords = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            zoom: DEFAULT_USER_COORDS_ZOOM
                        };
                        setCoordinates(coords);
                        resolve(coords);
                    }, (error) => {
                        console.error(error.message);
                        setError(error.message);
                        reject(new Error(error.message));
                    });
                }
            });
        } else {
            reject("Geolocation not supported");
        }
    });
}


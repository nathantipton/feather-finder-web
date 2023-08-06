import { PRIVATE_EBIRD_API_KEY } from "$env/static/private";


export function getSpeciesByRegion(region: string) {
    return fetch(`https://api.ebird.org/v2/product/spplist/${region}`, {
        headers: {
            'X-eBirdApiToken': PRIVATE_EBIRD_API_KEY
        }
    })
}

export function getNotableNearbySpecies(coordinates: { lat: number, lng: number }) {
    return fetch(`https://api.ebird.org/v2/data/obs/geo/recent/notable?lat=${coordinates.lat}&lng=${coordinates.lng}&back=10`, {
        headers: {
            'X-eBirdApiToken': PRIVATE_EBIRD_API_KEY
        }
    })
}
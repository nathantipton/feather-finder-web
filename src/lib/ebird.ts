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

/**
 * Get all observations of a species, seen up to 30 days ago,
 * at any location within a radius of up to 50 kilometers, 
 * from a given set of coordinates. 
 * Results include only the most recent observation from each location in the region specified.
 * @param coordinates 
 * @param speciesCode 
 * @returns 
 */
export function getSpeciesObservationsByCoords(coordinates: { lat: number, lng: number }, speciesCode: string) {
    return fetch(`https://api.ebird.org/v2/data/obs/geo/recent/${speciesCode}?lat=${coordinates.lat}&lng=${coordinates.lng}&back=30&dist=50`, {
        headers: {
            'X-eBirdApiToken': PRIVATE_EBIRD_API_KEY
        }
    })
}


export function getSpeciesTaxonomy(speciesCode: string) {
    return fetch(`https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&locale=en&species=${speciesCode}`)
}
import { PRIVATE_EBIRD_API_KEY } from "$env/static/private";


export function getSpeciesByRegion(region: string) {
    return fetch(`https://api.ebird.org/v2/product/spplist/${region}`, {
        headers: {
            'X-eBirdApiToken': PRIVATE_EBIRD_API_KEY
        }
    })
}
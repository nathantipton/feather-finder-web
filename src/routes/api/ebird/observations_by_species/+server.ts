import { getSpeciesObservationsByCoords } from '$lib/ebird.js';
import type { SpeciesObservation_DTO } from '$lib/models/ebird';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const { lat, lng, speciesCode } = await request.json();

    const response = await getSpeciesObservationsByCoords({ lat, lng }, speciesCode);
    const observations: SpeciesObservation_DTO[] = await response.json();

    return json(observations);
}
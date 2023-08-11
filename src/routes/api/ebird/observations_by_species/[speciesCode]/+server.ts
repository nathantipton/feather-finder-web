import { getSpeciesObservationsByCoords } from '$lib/ebird.js';
import type { Observation_DTO } from '$lib/models/ebird';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params }) {
    const { speciesCode } = params;
    const { lat, lng } = await request.json();

    const response = await getSpeciesObservationsByCoords({ lat, lng }, speciesCode);
    const observations: Observation_DTO[] = await response.json();

    return json(observations);
} 
import { getNotableNearbySpecies } from "$lib/ebird.js";
import type { NearbyNotableSpecies_DTO } from "$lib/models/ebird.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const { lat, lng } = await request.json();

    const response = await getNotableNearbySpecies({ lat, lng });
    const species: NearbyNotableSpecies_DTO[] = await response.json();

    return json(species);
}
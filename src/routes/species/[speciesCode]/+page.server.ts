import { getSpeciesTaxonomy } from "$lib/ebird";
import type { SpeciesTaxonomy_DTO } from "$lib/models/ebird";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const { speciesCode } = params;

    const response = await getSpeciesTaxonomy(speciesCode);
    const jsonData = await response.json();

    if (!jsonData || jsonData.length === 0) {
        throw error(404, "Species not found");   
    }

    const speciesDetails: SpeciesTaxonomy_DTO = jsonData[0];

    return {
        speciesDetails
    }
}
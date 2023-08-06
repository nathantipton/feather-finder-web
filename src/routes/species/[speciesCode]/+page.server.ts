import { getSpeciesTaxonomy } from "$lib/ebird";
import type { SpeciesTaxonomy_DTO } from "$lib/models/ebird";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const { speciesCode } = params;

    const response = await getSpeciesTaxonomy(speciesCode);
    const speciesDetails: SpeciesTaxonomy_DTO = (await response.json())[0];

    return {
        speciesDetails
    }
}
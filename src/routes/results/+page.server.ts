import { AlgoliaSearchClient } from "$lib/algolia";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const query = url.searchParams.get('s');
    const searchClient = new AlgoliaSearchClient();

    if (!query) {
        throw error(400, "No query provided")
    }

    const results = await searchClient.query(query);

    return {
        results
    }
}
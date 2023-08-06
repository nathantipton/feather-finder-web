import { getSpeciesByRegion } from '$lib/ebird';
import { AlgoliaAdminClient } from '$lib/server/algolia-admin';
import type { Actions } from './$types';


export const actions: Actions = {
    sync_region: async () => {

        const region = 'US-NC';

        const response = await getSpeciesByRegion(region);
        const species: string[] = await response.json();

        const adminClient = new AlgoliaAdminClient();

        const algResponse = await adminClient.addRegionToSpeciesRecords(region, species);

        console.log(algResponse);

        return {
            status: 200
        }

    }
}
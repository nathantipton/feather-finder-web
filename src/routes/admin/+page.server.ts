import { dev } from '$app/environment';
import { getSpeciesByRegion } from '$lib/ebird';
import { AlgoliaAdminClient } from '$lib/server/algolia-admin';
import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async () => {
    // Hide this route in production
    if (!dev) {
        throw error(404, 'Not found');
    }
}


export const actions: Actions = {
    sync_region: async () => {

        const region = 'US-NC';

        const response = await getSpeciesByRegion(region);
        const species: string[] = await response.json();

        const adminClient = new AlgoliaAdminClient();

        await adminClient.addRegionToSpeciesRecords(region, species);

        return {
            status: 200
        }

    },

    flag_hybrid: async () => {

        const adminClient = new AlgoliaAdminClient();

        await adminClient.flagSpeciesAsHybrid();

        return {
            status: 200
        }

    }
}
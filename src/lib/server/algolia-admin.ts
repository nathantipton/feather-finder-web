import { PRIVATE_ALGOLIA_ADMIN_KEY } from "$env/static/private";
import { PUBLIC_ALGOLIA_APP_ID } from "$env/static/public";
import type { SearchClient, SearchIndex } from "algoliasearch";
import algoliasearch from "algoliasearch";


export class AlgoliaAdminClient {

    #adminClient: SearchClient;
    #index: SearchIndex;

    constructor(index: string = 'species') {
        this.#adminClient = algoliasearch(
            PUBLIC_ALGOLIA_APP_ID,
            PRIVATE_ALGOLIA_ADMIN_KEY
        );

        this.#index = this.#adminClient.initIndex(index);
    }

    addRegionToSpeciesRecords(region: string, species: string[]) {
        const adminClient = new AlgoliaAdminClient();
        const speciesRecords = species.map(species => ({
            objectID: species,
            regions: {
                _operation: 'AddUnique',
                value: region
            }
        }));

        return adminClient.#index.partialUpdateObjects(speciesRecords);
    }
}



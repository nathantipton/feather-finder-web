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

    async flagSpeciesAsHybrid() {
        const adminClient = new AlgoliaAdminClient();

        const hits: any[] = [];

        // Step 1: Retrieve all records from the index using browseObjects
        await this.#index.browseObjects({
            query: '', // Retrieve all records
            batch: batch => hits.push(...batch)
        });

        // Step 2: Iterate over each record and check for "(hybrid)" in comName
        const updatedRecords = hits.map(record => {
            if (record.comName && record.comName.includes("(hybrid)")) {
                record.hybrid = true;
            } else {
                record.hybrid = false;
            }
            return record;
        });
        
        // Step 3: Update the records in the index
        await this.#index.partialUpdateObjects(updatedRecords);
    }
}



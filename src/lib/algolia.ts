import { PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY } from '$env/static/public';
import algoliasearch, { type SearchClient, type SearchIndex } from 'algoliasearch';

export class AlgoliaSearchClient implements App.SearchClient {

    #client: SearchClient;
    #index: SearchIndex;

    constructor(index: string = 'species') {
        this.#client = algoliasearch(
            PUBLIC_ALGOLIA_APP_ID,
            PUBLIC_ALGOLIA_SEARCH_KEY
        );

        this.#index = this.#client.initIndex(index);
    }

    query(query: string, onlyUS: boolean = true, includeHybrid: boolean = false): Promise<any> {
        let filters = '';

        // If onlyUS is true, add the regions:US filter
        if (onlyUS) {
            filters = 'regions:US';
        }

        if (!includeHybrid) {
            if (filters) {
                filters += ' AND ';
            }
            filters += 'hybrid:false';
        }

        return this.#index.search(query, { filters });
    }
}
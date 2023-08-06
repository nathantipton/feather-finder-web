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

    query(query: string, onlyUS: boolean = true): Promise<any> {
        return this.#index.search(query,
            {
                filters: onlyUS ? 'regions:US' : 'undefined'
            }
        );
    }
}
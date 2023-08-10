import { PUBLIC_ALGOLIA_APP_ID, PUBLIC_ALGOLIA_SEARCH_KEY } from '$env/static/public';
import type { SearchResponse } from '@algolia/client-search';
import algoliasearch, { type SearchClient, type SearchIndex } from 'algoliasearch';
import aa from 'search-insights';
import type { SpeciesRecord } from './models/ebird';

export class AlgoliaSearchClient implements App.SearchClient {

    #client: SearchClient;
    #index: SearchIndex;

    constructor(index: string = 'species') {
        this.#client = algoliasearch(
            PUBLIC_ALGOLIA_APP_ID,
            PUBLIC_ALGOLIA_SEARCH_KEY
        );

        this.#index = this.#client.initIndex(index);

        // Initialize search-insights
        aa('init', {
            appId: PUBLIC_ALGOLIA_APP_ID,
            apiKey: PUBLIC_ALGOLIA_SEARCH_KEY,
        });

    }


    query(query: string, onlyUS: boolean = true, includeHybrid: boolean = false): Readonly<Promise<SearchResponse<SpeciesRecord>>> {
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

        return this.#index.search<SpeciesRecord>(query, { filters, clickAnalytics: true });
    }

    static objectClickedAfterSearch(queryID: string, objectID: string, position: number, index: string = 'species') {
        aa('clickedObjectIDsAfterSearch', {
            eventName: 'Object Clicked in Search Results Page',
            index,
            queryID,
            objectIDs: [objectID],
            positions: [position],
        });
    }

    static objectClickedInSearchResults(queryID: string, objectID: string, position: number, index: string = 'species') {
        aa('clickedObjectIDsAfterSearch', {
            eventName: 'Object Clicked in Search Results Preview',
            index,
            queryID,
            objectIDs: [objectID],
            positions: [position],
        });
    }
}
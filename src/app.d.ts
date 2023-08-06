// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			searchClient: App.SearchClient;
		}
		// interface PageData {}
		// interface Platform {}
		interface SearchClient {
			query(query: string): Promise<any>;
		}
	}
}

export { };


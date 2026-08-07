import { type HttpClient, httpClient } from '../httpClient.ts';
import { Observable, type ReadOnlyObservable } from '../reactive.ts';
import type { Pokemon } from './pokemon.ts';




class PokedexService {
	private _loadingState = new Observable<'loading' | 'loaded' | 'error'>('loading');
	private _httpClient: HttpClient;
	private _pokemonList: Pokemon[] = [];

	constructor(httpClient: HttpClient) {
		this._httpClient = httpClient;
		this.load();
	}

	get loadingState(): ReadOnlyObservable<'loading' | 'loaded' | 'error'> {
		return this._loadingState;
	}

	get loaded(): Promise<void> {
		return new Promise((resolve, reject) => {
			const unsubscribe = this._loadingState.subscribe(state => {
				if (state === 'loaded') {
					resolve();
					unsubscribe();
				} else if (state === 'error') {
					reject(new Error('Failed to load pokedex'));
					unsubscribe();
				}
			}, true);
		});
	}

	async load() {
		this._loadingState.set('loading');
		try {
			const response = await this._httpClient.runQuery<{ pokedex: Pokemon[] }>('/api/v1/pokedex', new AbortController().signal);
			this._pokemonList = response.pokedex;
			this._loadingState.set('loaded');
		} catch (error) {
			console.error('Error loading pokedex:', error);
			this._loadingState.set('error');
		}
	}

	searchPokemonByName(name: string): Pokemon[] {
		const lowerCaseName = name.toLowerCase();
		return this._pokemonList.filter(pokemon =>
			pokemon.names.en.toLowerCase().includes(lowerCaseName) ||
			pokemon.names.de.toLowerCase().includes(lowerCaseName)
		);
	}
}

const pokedexService = new PokedexService(httpClient);

export type { PokedexService };
export { pokedexService };

import Fuse from 'fuse.js';
import { type HttpClient, httpClient } from '../httpClient.ts';
import { Observable, type ReadOnlyObservable } from '../reactive.ts';
import type { Pokemon } from './pokemon.ts';

const pokedexUrl = '/api/v1/pokedex';
const matchThreshold = 0.6;

class PokedexService {
	private _loadingState = new Observable<'loading' | 'loaded' | 'error'>('loading');
	private _httpClient: HttpClient;
	private _pokedexFuse: Fuse<Pokemon> | null = null;

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
			const response = await this._httpClient.runQuery<{ pokedex: Pokemon[] }>(
				pokedexUrl,
				new AbortController().signal,
			);
			this._pokedexFuse = new Fuse(response.pokedex, {
				keys: [
					'names.en',
					'names.de',
					'primary_type.names.en',
					'primary_type.names.de',
					'secondary_type.names.en',
					'secondary_type.names.de',
				],
				threshold: matchThreshold,
			});
			this._loadingState.set('loaded');
		} catch (error) {
			console.error('Error loading pokedex:', error);
			this._loadingState.set('error');
		}
	}

	searchPokemonByName(name: string): Pokemon[] {
		if (!this._pokedexFuse) {
			throw new Error('Pokedex not loaded yet');
		}
		const results = this._pokedexFuse.search(name);
		return results.map(result => result.item);
	}
}

const pokedexService = new PokedexService(httpClient);

export type { PokedexService };
export { pokedexService };

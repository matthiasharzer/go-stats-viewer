import { css, html } from 'lit';
import { state } from 'lit/decorators/state.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { Component } from './litutil/Component.ts';
import type { Pokemon } from './services/pokedex/pokemon.ts';
import { pokedexService } from './services/pokedex/service.ts';

export class PokemonSearch extends Component {
	static styles = css`
		:host {
			width: 100%;
		}

		.pokemon-search {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			width: 100%;
		}

		.search-box {
			width: 100%;
			padding: 1rem;
			font-size: 1.5rem;
		}

		.search-results-floating-anchor {
			position: relative;
			top: 0;
			width: 100%;
		}

		.search-results {
			position: absolute;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.4rem;
			width: 100%;

			.search-result {
				width: 100%;
				padding: 0.5rem;
				cursor: pointer;
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
		}

		.pokemon-details {
			flex: 1;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			gap: 0.2rem;

			.pokemon-names {
				display: flex;
				flex-direction: column;
				gap: 0.1rem;
			}

			.pokemon-types {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 0.3rem;
			}
		}

		input {
			background: rgba(0, 0, 0, 0.2);
			border: none;
			outline: none;
			padding: 0.5rem;
			width: 100%;
		}
	`;

	private _inputRef = createRef<HTMLInputElement>();

	get inputElement() {
		if (!this._inputRef.value) {
			throw new Error('Input element is not available');
		}
		return this._inputRef.value;
	}

	@state()
	pokemonOptions: Pokemon[] = [];

	handleInput() {
		if (!this.inputElement.value) {
			this.pokemonOptions = [];
			return;
		}
		const matchingPokemon = pokedexService.searchPokemonByName(this.inputElement.value);
		this.pokemonOptions = matchingPokemon.slice(0, 5);
	}

	handleKeyDown(event: KeyboardEvent) {
		if (event.key !== 'Enter') return;
		if (this.pokemonOptions.length > 0) {
			this.submitSearch(this.pokemonOptions[0]);
		}
	}

	submitSearch(pokemon: Pokemon) {
		this.dispatchEvent(new CustomEvent('pokemon-selected', { detail: pokemon }));
		this.inputElement.value = '';
		this.pokemonOptions = [];
	}

	renderSearchResult(pokemon: Pokemon) {
		return html`
			<go-neo-element
				class="search-result"
				variant="search-result"
				on-hover="flatten"
				@click=${() => this.submitSearch(pokemon)}
			>
				<go-pokemon-image .pokemon=${pokemon} size="48px"></go-pokemon-image>
				<div class="pokemon-details">
					<div class="pokemon-names">
						<h3>${pokemon.names.en}</h3>
						<p>${pokemon.names.de}</p>
					</div>
					<div class="pokemon-stats">
						<go-stats-snippet .pokemon=${pokemon}></go-stats-snippet>
					</div>
					<div class="pokemon-types">
						<go-type-badge .type=${pokemon.primary_type}></go-type-badge>
						${pokemon.secondary_type ? html`<go-type-badge .type=${pokemon.secondary_type}></go-type-badge>` : ''}
					</div>
				</div>
			</go-neo-element>
		`;
	}

	render() {
		return html`
		<div class="pokemon-search">
			<go-neo-element
				class="search-box"
				variant="search-box"
			>
				<input type="text" placeholder="Search for a Pokémon..." @input=${this.handleInput} @keydown=${this.handleKeyDown} ${ref(this._inputRef)} />
			</go-neo-element>
			<div class="search-results-floating-anchor">
				<div class="search-results">
					${this.pokemonOptions.map(pokemon => this.renderSearchResult(pokemon))}
				</div>
			</div>
		</div>
		`;
	}
}

customElements.define('go-pokemon-search', PokemonSearch);

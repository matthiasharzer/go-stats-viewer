import { css, html } from 'lit';
import { state } from 'lit/decorators/state.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { Component } from './litutil/Component.ts';
import type { Pokemon } from './services/pokedex/pokemon.ts';
import { pokedexService } from './services/pokedex/service.ts';

export class PokemonSearch extends Component {
	static styles = css`

		.pokemon-search {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 2rem;
			gap: 0.5rem;
			width: 90vw;
			max-width: 500px;
		}

		.search-box {
			width: 100%;
			padding: 0.5rem;
		}

		.search-results {
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

				.type {
					padding: 0.2rem 0.4rem;
					border-radius: 4px;
					font-size: 0.8rem;
					color: white;
					text-transform: capitalize;
					background-color: var(--color);
					box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
				}
			}
		}



		input {
			background: rgba(0, 0, 0, 0.2);
			border: none;
			outline: none;
			padding: 0.5rem;
			font-size: 1rem;
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
		this.inputElement.value = pokemon.names.en;
		this.pokemonOptions = [];
	}


	renderSearchResult(pokemon: Pokemon) {
		return html`
			<go-neo-element
				class="search-result"
				variant="search-result"
				@click=${() => this.submitSearch(pokemon)}
			>
				<img src=${pokemon.assets.image} alt=${pokemon.names.en} width="48" height="48" />
				<div class="pokemon-details">
					<div class="pokemon-names">
						<h3>${pokemon.names.en}</h3>
						<p>${pokemon.names.de}</p>
					</div>
					<div class="pokemon-types">
						<span class="type" style="--color: var(--${pokemon.primary_type.type}-color)">${pokemon.primary_type.names.de}</span>
						${pokemon.secondary_type ? html`<span class="type" style="--color: var(--${pokemon.secondary_type.type}-color)">${pokemon.secondary_type.names.de}</span>` : ''}
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

			<div class="search-results">
				${this.pokemonOptions.map(pokemon => this.renderSearchResult(pokemon))}
			</div>
		</div>
		`;
	}
}

customElements.define('go-pokemon-search', PokemonSearch);

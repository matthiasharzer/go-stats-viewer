import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { Component } from './litutil/Component.ts';
import { type Pokemon, typeColors } from './services/pokedex/pokemon.ts';
import { pokedexService } from './services/pokedex/service.ts';

export class App extends Component {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 100%;
		}
		go-background {
			z-index: -1;
		}

		.app-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			gap: 1rem;
			padding: 2rem;
			width: 90vw;
			max-width: 800px;
			height: 100%;
		}
	`;

	@state()
	selectedPokemon: Pokemon | null = null;

	connectedCallback(): void {
		super.connectedCallback();
		pokedexService.loadingState.subscribeHost(this, true);

		for (const [typeName, typeColor] of Object.entries(typeColors)) {
			document.documentElement.style.setProperty(
				`--POKEMON_TYPE_${typeName.toUpperCase()}-color`,
				typeColor,
			);
		}

		pokedexService.loaded.then(() => {
			// this.selectedPokemon = pokedexService.searchPokemonByName("Azumarill")[0] || null;
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		pokedexService.loadingState.unsubscribeHost(this);
	}

	handlePokemonSelected(pokemon: Pokemon) {
		this.selectedPokemon = pokemon;
	}

	app() {
		return html`
			<div class="app-container">
				<go-pokemon-search @pokemon-selected=${(e: CustomEvent) => this.handlePokemonSelected(e.detail)}></go-pokemon-search>
				${
					this.selectedPokemon
						? html`
					<go-pokemon-page .pokemon=${this.selectedPokemon}></go-pokemon-page>
				`
						: ''
				}
			</div>
		`;
	}

	render() {
		return html`
			<go-background></go-background>
			${choose(pokedexService.loadingState.value, [
				[
					'loading',
					() => html`
				<go-neo-element variant="default">
					<div class="info-container">
						Loading Pokedex...
					</div>
				</go-neo-element>`,
				],
				[
					'error',
					() => html`
				<go-neo-element variant="error">
					<div class="info-container">
						Error loading Pokedex. Please try again later.
					</div>
				</go-neo-element>`,
				],
				['loaded', () => this.app()],
			])}
				`;
	}
}

customElements.define('go-app', App);

import { css, html } from 'lit';
import { Component } from './litutil/Component.ts';
import { type Pokemon, typeColors } from './services/pokedex/pokemon.ts';
import { pokedexService } from './services/pokedex/service.ts';

export class App extends Component {
	static styles = css`
		go-background {
			z-index: -1;
		}
	`;

	connectedCallback(): void {
		super.connectedCallback();
		pokedexService.loadingState.subscribeHost(this, true);

		for (const [typeName, typeColor] of Object.entries(typeColors)) {
			document.documentElement.style.setProperty(`--POKEMON_TYPE_${typeName.toUpperCase()}-color`, typeColor);
		}
	}

	handlePokemonSelected(pokemon: Pokemon) {
		console.log('Pokemon selected:', pokemon);
	}


	render() {
		if (pokedexService.loadingState.value === 'loading') {
			return html`<go-neo-element>Loading Pokedex...</go-neo-element>`;
		}
		return html`
			<go-background></go-background>
			<go-pokemon-search @pokemon-selected=${(e: CustomEvent) => this.handlePokemonSelected(e.detail)}></go-pokemon-search>
		`;
	}
}

customElements.define('go-app', App);

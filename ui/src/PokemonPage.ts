import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { Component } from './litutil/Component.ts';
import type { Pokemon } from './services/pokedex/pokemon.ts';

export class PokemonPage extends Component {
	static styles = css`
		:host {
			display: block;
			width: 100%;
		}

		.pokemon-page {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			padding: 1rem;
			width: 100%;
		}
	`;

	@property({ attribute: false })
	pokemon: Pokemon | null = null;

	render() {
		if (!this.pokemon) {
			return null;
		}
		return html`
			<go-neo-element
				class="pokemon-page"
				variant="pokemon-page"
				radius="sharp"
				border="thick"
			>
				${this.pokemon.names.en} (ID: ${this.pokemon.id})
			</go-neo-element>
		`;
	}
}

customElements.define('go-pokemon-page', PokemonPage);

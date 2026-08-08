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

		.pokemon-image {
			width: 200px;
			height: 200px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.pokemon-image img {
			max-width: 100%;
			max-height: 100%;
		}

		.pokemon-image-placeholder {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 4rem;
			color: var(--colors-variants-default-ink);
		}

		.basics {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: flex-start;
			width: 100%;
			gap: 1rem;
		}

		.attributes {
			display: grid;
			grid-template-areas:
				"names types"
				"stats stats";
			gap: 0.5rem;

			.pokemon-names {
				grid-area: names;
			}
			.pokemon-types {
				grid-area: types;
				display: flex;
				flex-direction: row;
				align-items: flex-start;

				gap: 0.5rem;
			}
			.pokemon-stats {
				grid-area: stats;
			}
		}
	`;

	@property({ attribute: false })
	pokemon: Pokemon | null = null;

	renderImage() {
		if (!this.pokemon) {
			return null;
		}
		return html`
			<div class="pokemon-image">
				${this.pokemon.assets.image ? html`<img src=${this.pokemon.assets.image} alt=${this.pokemon.names.en} />` : html`<div class="pokemon-image-placeholder">?</div>`}
			</div>
		`;
	}

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
				<div class="basics">
					<go-pokemon-image .pokemon=${this.pokemon} size="200px"></go-pokemon-image>
					<div class="attributes">
						<div class="pokemon-names">
							<h3>${this.pokemon.names.en}</h3>
							<p>${this.pokemon.names.de}</p>
						</div>
						<div class="pokemon-types">
							<go-type-badge .type=${this.pokemon.primary_type}></go-type-badge>
							${this.pokemon.secondary_type ? html`<go-type-badge .type=${this.pokemon.secondary_type}></go-type-badge>` : ''}
						</div>
						<div class="pokemon-stats">
							<go-stats-snippet .pokemon=${this.pokemon} size="medium"></go-stats-snippet>
						</div>
						<div class="pokemon-id">
							Nr: #${this.pokemon.dex_nr} | Gen: ${this.pokemon.generation}
						</div>
					</div>
				</div>
			</go-neo-element>
		`;
	}
}

customElements.define('go-pokemon-page', PokemonPage);

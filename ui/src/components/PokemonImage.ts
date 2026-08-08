import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { Component } from '../litutil/Component.ts';
import type { Pokemon } from '../services/pokedex/pokemon.ts';

export class PokemonImage extends Component {
	static styles = css`
		:host {
			display: block;
			width: var(--pokemon-image-size, 48px);
			height: var(--pokemon-image-size, 48px);
		}

		.pokemon-image-placeholder {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 2rem;
			background-color: rgba(0, 0, 0, 0.2);
		}
	`;

	@property({ attribute: false })
	pokemon: Pokemon | null = null;

	@property()
	size: string = "48px"

	@property()
	variant: "default" | "shiny" = "default"

	renderImage() {
		if (!this.pokemon?.assets) {
			return html`<div class="pokemon-image-placeholder">?</div>`;
		}
		const imageUrl = this.variant === "shiny" ? this.pokemon.assets.shiny_image : this.pokemon.assets.image;
		if (!imageUrl) {
			return html`<div class="pokemon-image-placeholder">?</div>`;
		}
		return html`<img src=${imageUrl} alt=${this.pokemon.names.en} />`;
	}

	render() {
		return html`
			<style>
				:host {
					--pokemon-image-size: ${this.size};
				}
			</style>
			${this.renderImage()}
		`;
	}
}

customElements.define('go-pokemon-image', PokemonImage);

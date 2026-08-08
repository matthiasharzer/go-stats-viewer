import { css, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { Component } from '../litutil/Component.ts';
import type { Pokemon } from '../services/pokedex/pokemon.ts';

export class StatsSnippet extends Component {
	static styles = css`
		.pokemon-stats {
			display: flex;
			flex-direction: row;
			gap: 0.5rem;
			margin: 0.5rem 0;
			font-size: var(--size, 1rem);

			.stat {
				display: flex;
				align-items: center;
				gap: 0.2rem;

				&.attack {
					color: var(--colors-stats-attacK);
				}

				&.defense {
					color: var(--colors-stats-defense);
				}

				&.stamina {
					color: var(--colors-stats-stamina);
				}
			}
		}
	`;

	static sizes = {
		small: '0.8rem',
		medium: '1rem',
		large: '1.2rem',
	};

	@property({ attribute: false })
	pokemon: Pokemon | null = null;

	@property()
	size: 'small' | 'medium' | 'large' = 'medium';

	render() {
		if (!this.pokemon) {
			return '';
		}
		const size = StatsSnippet.sizes[this.size] || StatsSnippet.sizes.medium;
		return html`
			<style>
				:host{
					--size: ${size};
					--svg-size: calc(${size} * 1.1);
				}
			</style>
			<div class="pokemon-stats">
				<div class="stat attack">
					<svg xmlns="http://www.w3.org/2000/svg" height="var(--svg-size)" viewBox="0 -960 960 960" width="var(--svg-size)" fill="currentColor"><path d="M762-96 645-212l-88 88-28-28q-23-23-23-57t23-57l169-169q23-23 57-23t57 23l28 28-88 88 116 117q12 12 12 28t-12 28l-50 50q-12 12-28 12t-28-12Zm118-628L426-270l5 4q23 23 23 57t-23 57l-28 28-88-88L198-96q-12 12-28 12t-28-12l-50-50q-12-12-12-28t12-28l116-117-88-88 28-28q23-23 57-23t57 23l4 5 454-454h160v160ZM278-526 80-724v-160h160l198 198-160 160Z"/></svg>
					${this.pokemon.stats.attack}
				</div>
				<div class="stat defense">
					<svg xmlns="http://www.w3.org/2000/svg" height="var(--svg-size)" viewBox="0 -960 960 960" width="var(--svg-size)" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z"/></svg>
					${this.pokemon.stats.defense}
				</div>
				<div class="stat stamina">
					<svg xmlns="http://www.w3.org/2000/svg" height="var(--svg-size)" viewBox="0 -960 960 960" width="var(--svg-size)" fill="currentColor"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg>
					${this.pokemon.stats.stamina}
				</div>

			</div>

			`;
	}
}

customElements.define('go-stats-snippet', StatsSnippet);

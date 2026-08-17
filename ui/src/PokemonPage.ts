import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { Component } from './litutil/Component.ts';
import { calculate4StarCPStats } from './services/cpStats.ts';
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
			container-type: inline-size;
		}

		.pokemon-image {
			flex: 1 0 auto;
			padding: 1rem;
			display: flex;
			justify-content: center;

			.pokemon-image-sizer {
				width: 200px;
				height: 200px;
			}
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
			width: 100%;
			gap: 1rem;
		}

		@container (width < 600px) {
			.basics{
				display: grid;
			}
		}

		.attributes-box {
			width: 100%;
		}

		.attributes {
			width: 100%;
			padding: 1rem;

			display: grid;
			grid-template-areas:
				"names types"
				"stats stats";
			grid-template-columns: auto 1fr;
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

		.pokemon-cp-stats-section {
			width: 100%;
			padding: 1rem;

			h3 {
				margin-bottom: 0.5rem;
			}
		}

		.pokemon-cp-stats {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.5rem 0;

			&>:nth-child(4n+1), &>:nth-child(4n+2) {
				background-color: rgba(0, 0, 0, 0.1);
			}

			.label {
				font-weight: bold;
				padding: 0.5rem 0 0.5rem 0.5rem;
			}

			.value {
				text-align: right;
				padding: 0.5rem 0.5rem 0.5rem 0;
				font-weight: bold;
				color: var(--colors-variants-default-ink);
			}
		}
	`;

	@property({ attribute: false })
	pokemon: Pokemon | null = null;

	get fourStarCP() {
		if (!this.pokemon) {
			throw new Error('Pokemon is not set');
		}
		return calculate4StarCPStats(this.pokemon);
	}

	renderCPStats() {
		if (!this.pokemon) {
			return null;
		}

		const cpStats = this.fourStarCP;
		return html`
			<div class="pokemon-cp-stats">
				<div class="label">
					Raid WP
				</div>
				<div class="value">
					${cpStats.raid}
				</div>
				<div class="label">
					Raid (Wetter Boosted) WP
				</div>
				<div class="value">
					${cpStats.raidWeatherBoosted}
				</div>
				<div class="label">
					Forschungsaufgabe WP
				</div>
				<div class="value">
					${cpStats.research}
				</div>
				<div class="label">
					Schlüpfe WP
				</div>
				<div class="value">
					${cpStats.eggs}
				</div>
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
					<go-neo-element class="pokemon-image" variant="pokemon-image" radius="sharp" border="thick">
						<div class="pokemon-image-sizer">
							<go-pokemon-image .pokemon=${this.pokemon} size="100%"></go-pokemon-image>
						</div>
					</go-neo-element>
					<go-neo-element class="attributes-box" variant="pokemon-attributes" radius="sharp" border="thick">
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
					</go-neo-element>
				</div>
				<go-neo-element class="pokemon-cp-stats-section" variant="pokemon-cp-stats" radius="sharp" border="thick">
					<div class="pokemon-four-star-cp">
						<h3>WP Stats (4-Sterne IVs)</h3>
						${this.renderCPStats()}
					</div>
				</go-neo-element>
			</go-neo-element>
		`;
	}
}

customElements.define('go-pokemon-page', PokemonPage);

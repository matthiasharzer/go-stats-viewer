import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { Component } from '../litutil/Component.ts';
import type { Type } from '../services/pokedex/pokemon.ts';

export class TypeBadge extends Component {
	static styles = css`
		:host {
			padding: 0.2rem 0.4rem;
			border-radius: 4px;
			font-size: 0.8rem;
			color: white;
			text-transform: capitalize;
			background-color: var(--color);
			text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
			box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
		}
	`;

	@property({ attribute: false })
	type: Type | null = null;

	render() {
		if (!this.type) {
			return html``;
		}
		return html`
			<style>
				:host {
					--color: var(--${this.type.type}-color);
				}
			</style>
			${this.type.names.de}
		`;
	}
}

customElements.define('go-type-badge', TypeBadge);

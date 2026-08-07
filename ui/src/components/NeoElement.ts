import { css, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { Component } from '../litutil/Component.ts';
import type { BorderWidthName, RadiusName, VariantName } from '../services/theme/theme.ts';

export class NeoElement extends Component {
	static styles = css`
		:host {
			display: block;
			box-shadow: var(--shadow-offset-x) var(--shadow-offset-y) 0px var(--shadow-color);
			transition: box-shadow 0.05s ease-in-out, transform 0.05s ease-in-out;
		}
	`;

	@property()
	variant: VariantName = 'window';

	@property()
	radius: RadiusName = 'sharp';

	@property()
	border: BorderWidthName = 'thick';


	get variantStyles() {
		return html`
			<style>
				:host {
					background-color: var(--colors-variants-${this.variant}-surface);
					color: var(--colors-variants-${this.variant}-ink);
					border: var(--border-width-${this.border}) solid var(--border-color);
					border-radius: var(--radius-${this.radius});
				}
			</style>
		`;
	}


	render() {
		return html`
			${this.variantStyles}
			<slot></slot>
		`;
	}
}

customElements.define('go-neo-element', NeoElement);


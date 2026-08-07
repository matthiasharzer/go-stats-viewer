import { css, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { Component } from '../litutil/Component.ts';
import type { BorderWidthName, RadiusName, VariantName } from '../services/theme/theme.ts';

export class NeoButton extends Component {
	static styles = css`
		:host {
			display: inline-block;
		}

		button {
			all: unset;
			font-weight: 600;
			cursor: pointer;
			width: 100%;
		}


		button:active mh-neo-element {
			box-shadow: 0px 0px 0px var(--shadow-color);
  		transform: translate(var(--shadow-offset-x), var(--shadow-offset-y));
		}
	`;

	@property()
	variant: VariantName = 'default';

	@property()
	radius: RadiusName = 'sharp';

	@property()
	border: BorderWidthName = 'thick';

	@property({ type: Boolean, reflect: true })
	disabled: boolean = false;

	render() {
		return html`
			<button ?disabled=${this.disabled}>
				<go-neo-element
					variant=${this.variant}
					radius=${this.radius}
					border=${this.border}
				>
					<slot></slot>
				</go-neo-element>
			</button>
		`;
	}
}

customElements.define('go-neo-button', NeoButton);

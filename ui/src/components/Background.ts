import { css, html } from 'lit';
import { Component } from '../litutil/Component.ts';

export class Background extends Component {
	static styles = css`
		:host {
			position: fixed;
			background-color: var(--colors-variants-canvas-surface);
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;
		}

		.overlay {
			position: absolute;

			top: -50%;
  		left: -50%;
			width: 200%;
  		height: 200%;

			background-image:
				url("./assets/images/ball.png"),
				url("./assets/images/ball.png");
			background-size: 80px 80px, 80px 80px;
			background-position: 0 0, 40px 	40px;
			background-repeat: repeat, repeat;
			transform: rotate(-25deg);
			opacity: 0.2;
		}
	`;

	render() {
		return html`
		<div class="overlay"></div>
		`;
	}
}

customElements.define('go-background', Background);

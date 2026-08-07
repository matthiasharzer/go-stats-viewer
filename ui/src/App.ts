import { css, html } from 'lit';
import { Component } from './litutil/Component.ts';

export class App extends Component {
	static styles = css``;

	render() {
		return html`
			<go-neo-element>
				<h1>Hello Pokémon World!</h1>
			</go-neo-element>
		`;
	}
}

customElements.define('go-app', App);

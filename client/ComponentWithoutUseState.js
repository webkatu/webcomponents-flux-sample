import dispatcher from './dispatcher';
import action from './action';
import store from './store';

const template = document.createElement('template');
template.innerHTML = `
<span></span>
<button type="button">+</button>
`;

class Component extends HTMLElement {
	constructor() {
		super();

		this.handleStoreChange = this.handleStoreChange.bind(this);

		const content = template.content.cloneNode(true);
		this.span = content.querySelector('span');
		const incrementButton = content.querySelectorAll('button')[0];

		incrementButton.addEventListener('click', (e) => {
			action.countUp();
		});

		this.appendChild(content);
	}

	set count(value) {
		if(value === this._count) return;
		this._count = value;
		this.span.textContent = value;
	}

	handleStoreChange() {
		this.count = store.count;
	}

	connectedCallback() {
		store.on('CHANGE', this.handleStoreChange);
		//初期処理
		this.handleStoreChange();
	}

	disconnectedCallback() {
		store.removeListener('CHANGE', this.handleStoreChange);
	}
}

customElements.define('x-component', Component);

export default Component
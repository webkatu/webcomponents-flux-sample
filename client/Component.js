import dispatcher from './dispatcher';
import action from './action';
import store from './store';
import useState from './useState';

const html = `
<span class="count"></span>
<button type="button">+</button>
`;

class Component extends HTMLElement {
	constructor() {
		super();

		this.handleStoreChange = this.handleStoreChange.bind(this);

		const template = document.createElement('template');
		template.innerHTML = html;
		const content = template.content;
		
		this.count = content.querySelector('.count');
		const incrementButton = content.querySelectorAll('button')[0];

		incrementButton.addEventListener('click', (e) => {
			action.countUp();
		});

		this.appendChild(content);
	}

	handleStoreChange() {
		this.setState({ count: store.getCount() });
	}

	connectedCallback() {
		store.on('CHANGE', this.handleStoreChange);
		//初期処理
		this.handleStoreChange();
	}

	disconnectedCallback() {
		store.removeListener('CHANGE', this.handleStoreChange);
	}

	stateChangedCallback(name, oldValue, newValue) {
		switch(name) {
			case 'count':
				this.count.textContent = newValue;
				break;
		}
	}

	static get observedState() {
		return ['count'];
	}
}

customElements.define('x-component', Component);

export default useState(Component)
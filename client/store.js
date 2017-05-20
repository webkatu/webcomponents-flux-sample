import Emitter from 'events';
import dispatcher from './dispatcher';

class Store extends Emitter {
	constructor(dispatcher) {
		super();

		this.count = 0;
		this.test = 0;
		dispatcher.on('countUp', this.onCountUp.bind(this));
	}

	getCount() {
		return this.count;
	}

	onCountUp() {
		this.count++;
		this.emit('CHANGE');
	}
}

export default new Store(dispatcher);
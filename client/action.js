import dispatcher from './dispatcher';

export default {
	countUp() {
		dispatcher.emit('countUp');
	},
}
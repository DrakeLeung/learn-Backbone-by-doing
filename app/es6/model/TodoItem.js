import config from '../config.js'

import Backbone from 'backbone'


let TodoItem = Backbone.Model.extend({
	urlRoot: config.serverUrl + 'todos',
	defaults: {
		id: null,
		title: '',
		done: false
	},

	toggle: function () {
		this.set('done', !this.get('done'));
	}
});

export default TodoItem;
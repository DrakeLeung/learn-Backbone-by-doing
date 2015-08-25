import config from '../config.js'

import Backbone from 'backbone'

import TodoItem from '../model/TodoItem.js'

let TodoCollection = Backbone.Collection.extend({
	model: TodoItem,
	url: config.serverUrl + 'todos',

	//initialize: function () {
	//	this.add([
	//		{ title: 'Sleep' },
	//		{ title: 'Eat' }
	//	]);
	//}
});

export default TodoCollection;
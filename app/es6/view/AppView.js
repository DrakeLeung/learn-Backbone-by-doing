require("../../style/app.css");

import $ from 'jquery';
import Backbone from 'backbone';

import TodoListView from './TodoListView';

var AppView = Backbone.View.extend({
	events: {
		'click input[type=submit]': 'addTodo'
	},


	render: function () {
		this.$input = $('.appView input.todoTitle');
		this.listTodo();
		return this;
	},

	listTodo: function () {
		let todoListView = new TodoListView().render().el;
		this.$('.todos').append(todoListView);
	},

	addTodo: function (event) {
		event.preventDefault();

		let title = this.$input.val();
		if (!title) {
			alert('You must input something first');
			return 0;
		}

		this.$input.val('');
	}
});

export default AppView;

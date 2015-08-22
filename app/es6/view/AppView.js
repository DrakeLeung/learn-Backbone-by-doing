//require("../../style/app.css");

import $ from 'jquery';
import Backbone from 'backbone';

import TodoItemView from './TodoItemView';

var AppView = Backbone.View.extend({
	events: {
		'click input[type=submit]': 'addTodo'
	},

	render: function () {
		this.$input = $('.appView input.todoTitle');
		return this;
	},

	addTodo: function (event) {
		event.preventDefault();

		let title = this.$input.val();
		if (!title) {
			alert('You must input something first');
			return 0;
		}

		let todoItemView = new TodoItemView().render(title).el;
		this.$el.append(todoItemView);
		this.$input.val('');
	}
});

export default AppView;

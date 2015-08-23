require("../../style/app.css")

import $ from 'jquery'
import Backbone from 'backbone'

import TodoListView from './TodoListView'
import TodoCollection from '../collection/TodoCollection.js'

var AppView = Backbone.View.extend({
	events: {
		'click input[type=submit]': 'addTodo'
	},

	initialize: function () {
		this.$input = $('.appView input.todoTitle');
		this.todoCollection = new TodoCollection();

		this.listenTo(this.todoCollection, 'add', this.render);
	},

	render: function () {
		this.listTodo();
		return this;
	},

	listTodo: function () {
		let todoListView = new TodoListView({
			collection: this.todoCollection
		});

		this.$('.todos').empty();
		this.$('.todos').append(todoListView.render().el);
	},

	addTodo: function (event) {
		event.preventDefault();

		let title = this.$input.val();
		if (!title) {
			alert('You must input something first');
			return 0;
		}

		this.todoCollection.add({
			title: title
		});
		this.$input.val('');
	}
});

export default AppView;

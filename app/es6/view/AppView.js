require("../../style/app.css")

import $ from 'jquery'
import Backbone from 'backbone'

import TodoListView from './TodoListView'
import TodoCollection from '../collection/TodoCollection.js'

var AppView = Backbone.View.extend({
	events: {
		'click input[type=submit]': 'addTodo',
		'click': 'handleClick'
	},


	initialize: function () {
		this.$input = $('.appView input.todoTitle');
		this.todoCollection = new TodoCollection();

		this.listenTo(this.todoCollection, 'add', this.render);
		this.listenTo(this.todoCollection, 'update', this.render);
	},

	render: function () {
		this.listTodo();
		return this;
	},

	listTodo: function () {
		let todoListView = new TodoListView({
			collection: this.todoCollection
		});

		this.$('.todo-list').remove();
		this.$('.todos').append(todoListView.render().el);
	},

	// handle the bubble click event
	handleClick: function (event) {
		let target = event.target,
			className = target.className;

		if (className == 'rm-todo')
			this.rmTodo(event);
		else if (className == 'todo-status' || className == 'todo-title')
			this.toggleTodoStatus(event);
	},

	// toggle the status of the todo
	toggleTodoStatus: function (event) {
		let todoTitle = '',
			target = event.target,
			tagName = target.tagName.toLowerCase();

		if (tagName == 'input')
			todoTitle = target.getAttribute('id');
		else if (tagName == 'label')
			todoTitle = target.getAttribute('for');

		let todoModel = this.todoCollection.where({ title: todoTitle })[0];
		let todoStatus = $('input.todo-status').is(':checked')? false : true;
		todoModel.set('done', todoStatus);

	},

	rmTodo: function (event) {
		event.preventDefault();
		let todoTitle = event.target.dataset.title;

		this.todoCollection.remove(
			this.todoCollection.where({ title: todoTitle })
		);
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

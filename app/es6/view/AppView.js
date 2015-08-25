require("../../style/app.css")

import $ from 'jquery'
import Backbone from 'backbone'

import TodoListView from './TodoListView'
import TodoCollection from '../collection/TodoCollection.js'
import TodoItem from '../model/TodoItem.js'

var AppView = Backbone.View.extend({
	events: {
		'click input[type=submit]': 'addTodo',
		'click': 'handleClick'
	},


	initialize: function () {
		this.$input = $('.appView input.todoTitle');
		this.todoCollection = new TodoCollection();
		this.todoCollection.fetch();

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

		// 如果是label的话，就omit掉，
		// 因为他会还自动触发对应的input的click事件
		if (tagName == 'label')
			return 0;
		else if (tagName == 'input')
			todoTitle = target.getAttribute('id');

		let todoModel = this.todoCollection.where({ title: todoTitle })[0];
		todoModel.toggle();

	},

	rmTodo: function (event) {
		event.preventDefault();
		let todoTitle = event.target.dataset.title;

		var todo = this.todoCollection.where({ title: todoTitle })[0];
		todo.destroy();
	},

	addTodo: function (event) {
		event.preventDefault();

		let title = this.$input.val();
		if (!title) {
			alert('You must input something first');
			return 0;
		}

		var newTodo = new TodoItem({
			title: title
		});
		newTodo.save();
		this.todoCollection.add(newTodo);

		this.$input.val('');
	}
});

export default AppView;

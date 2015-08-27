require("../../style/app.css")

import $ from 'jquery'
import Backbone from 'backbone'

import TodoListView from './TodoListView.js'
import StatView from './StatView.js'
import TodoCollection from '../collection/TodoCollection.js'
import TodoItem from '../model/TodoItem.js'

var AppView = Backbone.View.extend({
	events: {
		'keypress input': 'addTodo',
		'click': 'handleClick'
	},

	initialize: function () {
		let me = this;

		this.$input = $('.app-view .todo-input');
		this.todoCollection = new TodoCollection();

		this.todoCollection.fetch({
			success: function () {
				me.render();
				me.listenTo(me.todoCollection, 'update', me.render);
			}
		});

	},

	render: function () {
		this.createTodoListView();
		this.createStatView();

		return this;
	},

	createStatView: function () {
		if (!this.statView) {
			this.statView = new StatView({
				collection: this.todoCollection
			});
		}

		this.$el.append(this.statView.render().el);

	},

	createTodoListView: function () {
		if (!this.todoListView) {
			this.todoListView = new TodoListView({
				collection: this.todoCollection
			});
		}

		this.$el.append(this.todoListView.render().el);
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

		// if label ommit it,
		// cuz it will automically fire the checkbox's click event
		if (tagName == 'label') {
			return 0;
		} else if (tagName == 'input') {
			todoTitle = target.getAttribute('id');

			// set class to 'label' element for style
			$(target).next().toggleClass('done');
		}

		let todoModel = this.todoCollection.where({
			title: todoTitle
		})[0];

		todoModel.toggle();
		todoModel.save();

	},

	rmTodo: function (event) {
		event.preventDefault();

		// 'title' is data-* attribute, so access by 'element.dataset
		let todoTitle = event.target.dataset.title;

		let todo = this.todoCollection.where({
			title: todoTitle
		})[0];

		todo.destroy();
	},

	addTodo: function (event) {
		// If not 'Enter' key
		if (event.which != 13) return 0;

		let title = this.$input.val();
		if (!title || !title.trim()) {
			alert('You must input something first');
			return 0;
		}

		var newTodo = new TodoItem({
			'title': title
		});

		this.todoCollection.add(newTodo);
		newTodo.save();

		this.$input.val('');
	},

});



export default AppView;

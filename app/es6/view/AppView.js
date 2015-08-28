require("../../style/app.css")


import $ from 'jquery'
import Backbone from 'backbone'

import { ENTER_KEY } from '../config.js'

import TodoListView from './TodoListView.js'
import StatView from './StatView.js'
import TodoCollection from '../collection/TodoCollection.js'
import TodoItem from '../model/TodoItem.js'

let AppView = Backbone.View.extend({
	events: {
		'keypress input': 'addTodo',
		'click': 'handleClick'
	},

	initialize: function () {
		let me = this;

		this.$input = $('.app-view .todo-input');
		this.todoCollection = new TodoCollection();

		// fire 'reset' event,
		// instead of 'add' event which may triggered many times
		this.todoCollection.fetch({
			reset: true
		});

		//me.listenTo(me.todoCollection, 'add', me.updateView);
		me.listenTo(me.todoCollection, 'reset', me.render);
		me.listenTo(me.todoCollection, 'update', me.render);

	},

	//updateView: function (todoModel) {
	//	console.log('add');
	//	this.todoListView.singleTodo(todoModel);
	//	this.statView.updateCount();
	//
	//},

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

	createTodoListView: function (todoModel) {
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
		if (event.which != ENTER_KEY) return 0;

		let title = this.$input.val();
		if (!title || !title.trim()) {
			alert('You must input something first');
			return 0;
		}

		this.todoCollection.create({
			title: title
		});

		this.$input.val('');
	}

});



export default AppView;

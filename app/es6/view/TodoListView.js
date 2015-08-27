import Backbone from 'backbone'
import _ from 'underscore'

import TodoItemView from './TodoItemView'
import TodoItem from '../model/TodoItem.js'
import TodoCollection from '../collection/TodoCollection'

let TodoListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'todo-list',

	render: function () {
		this.$el.empty();
		this.listTodo();

		return this;
	},

	listTodo: function () {
		let me = this;

		_.each(me.collection.models, function (todoModel, index) {
			me.singleTodo(todoModel);
		});
	},

	singleTodo: function (todoModel) {
		let todoItemView = new TodoItemView({
			model: todoModel
		});

		this.$el.prepend(todoItemView.render().el);
	}

});

export default TodoListView;
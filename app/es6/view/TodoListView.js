import Backbone from 'backbone'
import _ from 'underscore'

import TodoItemView from './TodoItemView'
import TodoItem from '../model/TodoItem.js'
import TodoCollection from '../collection/TodoCollection'

let TodoListView = Backbone.View.extend({
	tagName: 'ul',
	className: 'todo-list',

	render: function () {
		let me = this;

		_.each(me.collection.models, function (todoModel, index) {

			let todoItemView = new TodoItemView({
				model: todoModel
			});

			me.$el.prepend(todoItemView.render().el);

		});

		return this;
	}
});

export default TodoListView;
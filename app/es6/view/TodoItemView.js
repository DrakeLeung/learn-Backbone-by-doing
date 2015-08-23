import _ from 'underscore'
import Backbone from 'backbone'
import TodoItem from '../model/TodoItem'
import todoItemTpl from '../../template/todoItemTpl'

let TodoItemView = Backbone.View.extend({
	tagName: 'li',
	className: 'todo-item',

	template: _.template(todoItemTpl),

	render: function () {
		this.$el.append(this.template({
			todo: this.model
		}));

		return this;
	}
});

export default TodoItemView;
import _ from 'underscore'
import Backbone from 'backbone'
import TodoItem from '../model/TodoItem'
import todoItemTpl from '../../template/todoItemTpl'

let TodoItemView = Backbone.View.extend({
	tagName: 'li',
	template: _.template(todoItemTpl),

	render: function (title) {
		this.model = new TodoItem({
			title: title
		});

		this.$el.append(this.template({
			todo: this.model
		}));

		return this;
	}
});

export default TodoItemView;
import Backbone from 'backbone';


let TodoItem = Backbone.Model.extend({
	defaults: {
		title: '',
		done: false
	}
});

export default TodoItem;
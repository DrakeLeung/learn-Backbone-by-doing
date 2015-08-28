import Backbone from 'backbone'
import _ from 'underscore'

import statTpl from '../../template/stat.html'

let StatView = Backbone.View.extend({
	tagName: 'footer',
	className: 'app-footer',
	template: _.template(statTpl),

	render: function () {
		this.$el.empty();

		this.$el.append(this.template({
			count: this.collection.length
		}));

		this.$countElement = this.$('.todo-count');

		return this;
	},

	updateCount: function () {
		this.$countElement.html(this.collection.length);
	}
});

export default StatView
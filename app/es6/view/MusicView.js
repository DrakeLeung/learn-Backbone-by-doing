import _ from 'underscore'
import $ from 'jquery'
import Backbone from 'backbone'

import musicTpl from '../../template/musicTpl.html'

let MusicView = Backbone.View.extend({
	tagName: 'li',
	className: 'music-item',

	template: _.template(musicTpl),

	render: function () {
		let tpl = this.template(this.model.toJSON());
		this.$el.append(tpl);

		return this;
	}
});

export default MusicView
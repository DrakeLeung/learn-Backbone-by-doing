import _ from 'underscore'
import $ from 'jquery'
import Backbone from 'backbone'

import musicDetailTpl from '../../template/musicDetailTpl.html'

let MusicDetailView = Backbone.View.extend({
	tagName: 'section',
	className: 'music-detail column',
	template: _.template(musicDetailTpl),

	render: function () {
		let tpl = this.template(this.model.toJSON());
		this.$el.empty();
		this.$el.append(tpl);

		return this;
	}
});

export default MusicDetailView;
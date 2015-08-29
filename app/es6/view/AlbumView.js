import _ from 'underscore'
import $ from 'jquery'
import Backbone from 'backbone'

import MusicView from './MusicView.js'

let AlbumView = Backbone.View.extend({
	tagName: 'ul',
	className: 'album column',

	initialize: function () {
	},

	render: function () {
		this.collection.each(this.musicView, this);
		return this;
	},

	musicView: function (musicModel) {
		let musicView = new MusicView({
			model: musicModel
		});

		this.$el.prepend(musicView.render().el);
	}
});

export default AlbumView;
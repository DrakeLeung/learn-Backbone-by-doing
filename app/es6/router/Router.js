import $ from 'jquery'
import Backbone from 'backbone'

import AppView from '../view/AppView.js'
import MusicDetailView from '../view/MusicDetailView.js'

let router = Backbone.Router.extend({
	initialize: function () {
		if (!this.appView) {
			this.appView = new AppView();
			this.collection = this.appView.collection;
		}

		if (!this.detailView) {
			this.detailView = new MusicDetailView();
		}

	},

	routes: {
		'': 'album',
		'album/:id': 'music'
	},

	album: function () {
		this.appView.setElement('.app-view');
	},

	music: function (id) {
		let model = this.collection.get(id);

		this.detailView.model = model;

		$('.app-view').append(this.detailView.render().el);
	}
});

export default router
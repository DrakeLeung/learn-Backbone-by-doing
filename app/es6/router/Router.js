import $ from 'jquery'
import Backbone from 'backbone'

import AppView from '../view/AppView.js'
import MusicDetailView from '../view/MusicDetailView.js'

let router = Backbone.Router.extend({
	initialize: function () {
	},

	routes: {
		'': 'album',
		'album/:id': 'music'
	},

	album: function () {
		if (!this.appView) {
			this.appView = new AppView();
			this.collection = this.appView.collection;
		}

		this.appView.setElement('.app-view');
	},

	music: function (id) {
		if (!this.detailView) {
			this.detailView = new MusicDetailView();
		}

		let collection = this.collection;
		if (!collection) {
			alert('The Music List is empty');
			this.navigate('', { trigger: true });
			return 0;
		}

		let model = collection.get(id);

		this.detailView.model = model;

		$('.app-view').append(this.detailView.render().el);
	}
});

export default router
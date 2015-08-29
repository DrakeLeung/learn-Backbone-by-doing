import Backbone from 'backbone'

import AlbumView from './AlbumView.js'
import Album from	'../collection/Album.js'

let AppView = Backbone.View.extend({
	initialize: function () {
		this.collection = new Album();
		this.collection.fetch({ reset: true });

		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function () {
		let albumView = new AlbumView({
			collection: this.collection
		});

		this.$el.append(albumView.render().el);
	}
});

export default AppView;

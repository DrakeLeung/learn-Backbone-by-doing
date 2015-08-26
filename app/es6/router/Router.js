import AppView from '../view/AppView';

let Router = Backbone.Router.extend({
	routes: {
		'': 'initialize'
	},

	initialize: function () {
		this.view = new AppView({
			el: '.app-view'
		});

		this.view.render();
	}
});


export default Router;
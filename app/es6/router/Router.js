import AppView from '../view/AppView';

let Router = Backbone.Router.extend({
	routes: {
		'': 'initialize'
	},

	initialize: function () {
		this.view = new AppView({
			el: '.app-view'
		});

	}
});


export default Router;
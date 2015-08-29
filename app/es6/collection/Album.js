import { config } from '../config.js'

import Backbone from 'backbone'

import Music from '../model/Music.js'


let Album = Backbone.Collection.extend({
	model: Music,
	url: config.host,

	initialize: function () {
	}

});

export default Album
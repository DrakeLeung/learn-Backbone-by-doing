import { config } from '../config.js'

import Backbone from 'backbone'

let MusicModel = Backbone.Model.extend({
	//urlRoot: config.host,

	defaults: {
		id: '',
		title: 'Unknown',
		artist: 'Unknown',
		album: 'Unknown',
		year: 'Unknown',
		duration: '',
		comment: '',
		cover: ''
	}
});

export default MusicModel
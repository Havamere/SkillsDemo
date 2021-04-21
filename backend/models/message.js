const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	color: { type: String, required: true },
	imagePath: {type: String, required: false}
});

module.exports = mongoose.model('Message', messageSchema);
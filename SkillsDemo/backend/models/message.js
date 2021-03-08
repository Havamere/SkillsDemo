const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	color: { type: String, required: true }
});

module.exports = mongoose.model('Message', messageSchema);
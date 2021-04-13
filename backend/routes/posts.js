const express = require("express");

const Message = require('../models/message');


const router = express.Router();


router.post("", (req, res, next) => {
	const message = new Message ({
		title: req.body.title,
		content: req.body.content,
		color: req.body.color
	});
	message.save().then(createdMessage => {
		res.status(201).json({
			response: 'Message added successfully.',
			messageId: createdMessage.id
		});
	});
});

router.put("/:id", (req, res, next) => {
	const message = new Message({
		_id: req.body.id,
		title: req.body.title,
		content: req.body.content,
		color: req.body.color
	});
	Message.updateOne({_id: req.param.id}, message).then(result => {
		res.status(200).json({response: "Update successful!"})
	});
});

router.get("", (req, res, next) => {
	const pageSize = +req.query.pagesize;
	const currentPage = +req.query.page;
	let fetchedMessages;
	const messageQuery = Message.find();
	if (pageSize && currentPage) {
		messageQuery
			.skip(pageSize * (currentPage - 1))
			.limit(pageSize);
	}
	messageQuery
		.then(documents => {
			fetchedMessages = documents;
			return Message.count()
		})
		.then(count => {
			res.status(200).json({
				response: 'Messages fetched successfully!',
				messages: fetchedMessages,
				maxMessages: count
			});
		});
});

router.get("/:id", (req, res, next) => {
	Message.findById(req.params.id).then(message => {
		if (message) {
			res.status(200).json(message);
		} else {
			res.status(400).json({response: 'Message not found.'});
		}
	})
});

router.delete("/:id", (req, res, next) => {
	Message.deleteOne({_id: req.param.id}).then(result => {
		res.status(200).json({response: "Message deleted!"});
	});
});

module.exports = router;
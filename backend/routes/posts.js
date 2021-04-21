const express = require("express");
const multer = require("multer");

const Message = require('../models/message');

const router = express.Router();

const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const isValid = MIME_TYPE_MAP[file.mimetype];
		let error = new Error("Invalid mime type")
		if (isValid) {
			error = null
		}
		cb(error, "backend/images");
	},
	filename: (req, file, cb) => {
		const name = file.originalname.toLowerCase().split(' ').join('-');
		const ext = MIME_TYPE_MAP[file.mimetype];
		cb(null, name + '-' + Date.now() + '.' + ext)
	}
});

router.post("", multer({storage: storage}).single('image'), (req, res, next) => {
	const url = req.protocol + '://' + req.get("host");
	const message = new Message ({
		title: req.body.title,
		content: req.body.content,
		color: req.body.color,
		imagePath: url + "/images/" + req.file.filename
	});
	message.save().then(createdMessage => {
		res.status(201).json({
			response: 'Message added successfully.',
			message: {
				...createdMessage,
				id: createdMessage._id
			}
		});
	});
});

router.put(
	"/:id", 
	multer({storage: storage}).single('image'), 
	(req, res, next) => {
		let imagePath = req.body.imagePath;
		if (req.file) {
			const url = req.protocol + '://' + req.get("host");
			imagePath = url + "/images/" + req.file.filename;
		}
	const message = new Message({
		_id: req.body.id,
		title: req.body.title,
		content: req.body.content,
		color: req.body.color,
		imagePath: imagePaths
	});
	Message.updateOne({_id: req.param.id}, message).then(result => {
		res.status(200).json({response: "Update successful!"})
	});
});

router.get("", (req, res, next) => {
	const pageSize = +req.query.pagesize; //converts the string to a number
	const currentPage = +req.query.page; //converts the string to a number
	const messageQuery = Message.find();
	let fetchedMessages;
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
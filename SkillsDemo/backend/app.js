const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const Message = require('./models/message');
const TeleSignSDK = require('telesignsdk');

const app = express();

// Message Board Application
mongoose.connect(
		"mongodb+srv://Havamere:ecL0v1QCYbJ7Bpr5@message-set.1dps6.mongodb.net/node-angular?retryWrites=true&w=majority"
		, { useNewUrlParser: true,  useUnifiedTopology: true }
		)
		.then(() => {
			console.log('Connected to the database.');
		})
		.catch(() => {
			console.log('Connection Failed!');
		});

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use( (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers", 
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader(
		"Access-Control-Allow-Methods", 
		"GET, POST, PATCH, DELETE, OPTIONS"
	);
	next();
});

app.get('/api/messages', (req, res, next) => {
	Message.find()
		   .then(documents => {
		   		res.status(200).json({
					response: 'Messages fetched successfully!',
					messages: documents
				});
		   });
});

app.post('/api/messages', (req, res, next) => {
	const message = new Message ({
		title: req.body.title,
		content: req.body.content,
		color: req.body.color
	});
	message.save();
	res.status(201).json({
		message: 'Message added successfully.'
	});
});

// Texting Application
const customerId = "73C691D6-7233-46C1-8CA8-F769ADBF32E4";
const apiKey = "ipYLzQFmrYpFZzH5FPfarPjEzpPae9xhjlBdRuzC4qXY1i/Re+ICgo3oYlh0XLD9Y4teMbAjAWpVJ7QAC0KbgQ==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( 
	customerId,
	apiKey,
	rest_endpoint,
	timeout // optional
	// userAgent
);

const phoneNumber = "14076979151";
const message = "";
const messageType = "ARN";

console.log("## MessagingClient.message ##");

function messageCallback(error, responseBody) {
  if (error === null) {
      console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
          ` => code: ${responseBody['status']['code']}` +
          `, description: ${responseBody['status']['description']}`);
  } else {
      console.error("Unable to send message. " + error);
  }
}

app.post('/api/text', (req, res, next) => {
	const textMessage = ({
		name: req.body.name,
		phoneNumber: req.body.phoneNumber,
		message: req.body.message
	});
	console.log(textMessage);
	client.sms.message(messageCallback, 
					   phoneNumber, 
					   textMessage.name+" has messaged you.\n"
					   	+textMessage.name+" can be reached at: "+textMessage.phoneNumber
					   	+".\n Here is their message:\n"
					   	+textMessage.message, 
					   messageType);
	res.status(201).json({
		message: 'Text sent successfully.'
	})

});

module.exports = app;
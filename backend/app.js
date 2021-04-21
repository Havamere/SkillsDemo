const path = require('path');
const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');

const TeleSignSDK = require('telesignsdk');
const postsRoutes = require('./routes/posts');

const app = express();


// Message Board Application
mongoose.connect(
		"mongodb+srv://Havamere:" + 
			process.env.MONGO_ATLAS_PW + 
			"@message-set.1dps6.mongodb.net/node-angular?retryWrites=true&w=majority"
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
app.use("/images", express.static(path.join("backend/images")));

app.use( (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers", 
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader(
		"Access-Control-Allow-Methods", 
		"GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	next();
});

app.use("/api/posts", postsRoutes);


// Texting Application
const customerId = process.env.customerId;
const apiKey = process.env.apiKey;
const rest_endpoint = process.env.rest_endpoint;
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( 
	customerId,
	apiKey,
	rest_endpoint,
	timeout // optional
	// userAgent
);

const phoneNumber = process.env.phoneNumber;
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
					   	+"They can be reached at: "+textMessage.phoneNumber
					   	+".\n Here is their message:\n"
					   	+textMessage.message, 
					   messageType);
	res.status(201).json({
		response: 'Text sent successfully.'
	})

});

module.exports = app;
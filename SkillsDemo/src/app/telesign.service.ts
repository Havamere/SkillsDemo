import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as TeleSignSDK from '../../node_modules/telesignsdk';
  	// declare function require(name:string);

@Injectable({
  providedIn: 'root'
})
export class TelesignService {

  constructor(/*private teleSignSDK: TeleSignSDK*/) { 

  	//var teleSignSDK = require('telesignsdk');

    // const customerId = "73C691D6-7233-46C1-8CA8-F769ADBF32E4";
    // const apiKey = "ipYLzQFmrYpFZzH5FPfarPjEzpPae9xhjlBdRuzC4qXY1i/Re+ICgo3oYlh0XLD9Y4teMbAjAWpVJ7QAC0KbgQ==";
    // const rest_endpoint = "https://rest-api.telesign.com";
    // const timeout = 10*1000; // 10 secs

    // const client = new teleSignSDK( 
    //     customerId,
    //     apiKey,
    //     rest_endpoint,
    //     timeout // optional
    //     // userAgent
    // );

    // const phoneNumber = "14076979151";
    // const message = "It works!  You did it!";
    // const messageType = "ARN";

    // function messageCallback(error, responseBody) {
    //     if (error === null) {
    //         console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
    //             ` => code: ${responseBody['status']['code']}` +
    //             `, description: ${responseBody['status']['description']}`);
    //     } else {
    //         console.error("Unable to send message. " + error);
    //     }
    // }

    // client.sms.message(messageCallback, phoneNumber, message, messageType);

    // console.log("## MessagingClient.message ##");
    //client.sms.message(messageCallback, phoneNumber, message, messageType);
    
   }
}

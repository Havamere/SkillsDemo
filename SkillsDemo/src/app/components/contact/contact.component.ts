import { Component, OnInit } from '@angular/core';
import { TelesignService } from '../../telesign.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})

export class ContactComponent implements OnInit {

  name: string;
  phone: string;
  message: string;
  // messageType: string;

  constructor() { }

  ngOnInit(): void {}

  /*
	Process the form we have. Send to whatever backend.
	Only alerting for now.
  */
  // phone = "14076979151";
  // message = "It works!  You did it!";
  // messageType = "ARN";
  // name = "Kyle R.";

  // function messageCallback(error, responseBody) {
  //     if (error === null) {
  //         console.log(`Messaging response for messaging phone number: ${this.phone}` +
  //             ` => code: ${responseBody['status']['code']}` +
  //             `, description: ${responseBody['status']['description']}`);
  //     } else {
  //         console.error("Unable to send message. " + error);
  //     }
  // }

  processForm() {
  	//this.telesignService.client.sms.message(this.messageCallback, this.phone, this.message, this.messageType);
    //console.log("## MessagingClient.message ##");
    console.log("button pressed");
  }

  sendText() {
    console.log("sending text")
  }

}

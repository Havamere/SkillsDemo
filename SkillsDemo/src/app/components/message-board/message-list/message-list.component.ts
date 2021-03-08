import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Message } from "../message.model";
import { MessagesService } from "../messages.service";

@Component({
	selector: 'app-message-list',
	templateUrl: '/message-list.component.html',
	styleUrls: ['./message-list.component.sass']
})
export class MessageListComponent implements OnInit, OnDestroy {

	messages: Message[] = [];
	private messagesSubscription: Subscription;

	constructor(public messagesService: MessagesService) {}

	ngOnInit() {
		this.messagesService.getMessages();
		this.messagesSubscription = this.messagesService.getMessagesUpdateListener()
							.subscribe((messages: Message[]) => {
								this.messages = messages;
							});
	}

	ngOnDestroy() {
		this.messagesSubscription.unsubscribe();
	}
}
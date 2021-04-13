import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
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
	totalMessages = 10;
	messagesPerPage = 10;
	currentPage = 1;
	pageSizeOptions = [3, 5, 10, 25];
	private messagesSubscription: Subscription;

	constructor(public messagesService: MessagesService) {}

	ngOnInit() {
		this.messagesService.getMessages(this.messagesPerPage, this.currentPage);
		this.messagesSubscription = this.messagesService.getMessagesUpdateListener()
							.subscribe((messages) => {
								this.messages = messages;
							});
	}

	onDelete() {
		this.messagesSubscription.deleteMessage(messageId);
	}

	onChangedPage(pageData: PageEvent) {
		this.currentPage = pageData.pageIndex + 1;
		this.messagesPerPage = pageData.pageSize;
		this.messagesService.getMessages(this.messagesPerPage, this.currentPage);
	}

	ngOnDestroy() {
		this.messagesSubscription.unsubscribe();
	}
}
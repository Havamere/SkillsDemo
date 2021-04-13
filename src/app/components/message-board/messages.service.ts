import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from './message.model';

@Injectable({providedIn: 'root'})

export class MessagesService {
	enteredTitle = "";
	enteredContent = "";
	messages: Message[];
	form: Form;

	private messagesUpdated = new Subject<{messages: Message, messageCount: number}>();

	constructor(private http: HttpClient, private router: Router) {}

	getMessages(messagesPerPage: number, currentPage: number) {
		const queryParams = '?pagesize=$(messagesPerPage)&page=$(currentPage)';
		this.http
			.get<{response: string, messages: any, maxMessages: number}>
				('http://localhost:3000/api/messages' + queryParams)
			.pipe(
				map(messagesData => {
					return { messages: messagesData.messages.map(message => {
						return {
							title: message.title,
							content: message.content,
							color: message.color,
							id: message.id,
						};
					}), maxMessages: messagesData.maxMessages};
				})
			)
			.subscribe((transformedMessagesData) => {
			 	this.messages = transformedMessagesData.messages;
			 	this.messagesUpdated.next({
			 		messages: [...this.messages],
			 		messageCount: transformedMessagesData.maxMessages
			 	});
			});
	}

	getMessagesUpdateListener() {
		return this.messagesUpdated.asObservable();
	}

	getMessage(id: string) {
		return this.http.get<{_id: string; title: string; content: string; color: string}>('http://localhost:3000/api/messages/' + id);
	}

	addMessage(title: string, content: string, color: string) {

		const message: Message = {	id: null, title: title,	content: content, color: color }

		this.http
			.post<{message: string, messageId: string}>('http://localhost:3000/api/messages', message)
			.subscribe((responseData) => {
			 	const message: Message = {
			 		id: responseData.messageId,
			 		title: title,
			 		content: content,
			 		color: color
			 	}
			 	const id = responseData.messageId;
			 	message.id = id;
			 	this.messages.push(message);
				this.messagesUpdated.next([...this.messages]);
				this.router.navigate(["/"]);
			 })
	}

	updateMessage(id: string, title: string, content: string, color: string) {
		const message: Message = { id: id, title: title, content: content, color: color };
		this.http
			.put('http://localhost:3000/api/messages/' + id, message)
			.subscribe(response => {
				const updatedMessages = [...this.messages];
				const oldMessageIndex = updatedMessages.findIndex(m => m.id === message.id);
				updatedMessages[oldMessageIndex] = message;
				this.messages = updatedMessages;
				this.messagesUpdated.next([...this.messages]);
				this.router.navigate(["/"]);
			});
	}

	deleteMessage(messageId: string) {
		this.http.delete('http://localhost:3000/api/messages/' + messageId)
			.subscribe(() => {
				const updatedMessages = this.messages.filter(message => message.id !== messageId);
				this.messages = updatedMessages;
				this.messagesUpdated.next([...this.messages]);
			})
	}
}
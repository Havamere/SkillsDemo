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

	private messagesUpdated = new Subject<{messages: Message[], messageCount: number}>();

	constructor(private http: HttpClient, private router: Router) {}

	getMessages(messagesPerPage: number, currentPage: number) {
		const queryParams = `?pagesize=${messagesPerPage}&page=${currentPage}`;
		this.http
			.get<{response: string, messages: any, maxMessages: number}>
				('http://localhost:3000/api/messages' + queryParams)
			.pipe(
				map(messagesData => {
					return { 
						messages: messagesData.messages.map(message => {
							return {
								id: message.id,
								title: message.title,
								content: message.content,
								color: message.color,
								imagePath: message.imagePath
							};
						}), 
					maxMessages: messagesData.maxMessages};
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
		return this.http.get<{_id: string; title: string; content: string; color: string; imagePath: string}>(
			'http://localhost:3000/api/messages/' + id
		);
	}

	addMessage(title: string, content: string, color: string, image: File) {

		const messageData = new FormData();

		messageData.append("title", title);
		messageData.append("content", content);
		messageData.append("color", color);
		messageData.append("image", image, title);

		this.http
			.post<{response: string, message: Message}>(
				'http://localhost:3000/api/messages', 
				messageData
				)
			.subscribe((responseData) => {
				this.router.navigate(["/"]);
			 })
	}

	updateMessage(id: string, title: string, content: string, color: string, image: File | string) {
		let messageData : Message | FormData;
		if (typeof(image) === 'object') {
			messageData =new FormData();
			messageData.append('id', id);
			messageData.append("title", title);
			messageData.append("content", content);
			messageData.append("color", color);
			messageData.append("image", image, title);
		} else {
			messageData = {
				id: id,
		 		title: title,
		 		content: content,
		 		color: color,
		 		imagePath: image
			};
		}

		this.http
			.put('http://localhost:3000/api/messages/' + id, messageData)
			.subscribe(response => {
				this.router.navigate(["/"]);
			});
	}

	deleteMessage(messageId: string) {
		return this.http.delete('http://localhost:3000/api/messages/' + messageId)
	}
}
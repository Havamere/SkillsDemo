import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from './message.model';

@Injectable({providedIn: 'root'})
export class MessagesService {
	private messages: Message[] = [];
	private messagesUpdated = new Subject<Message[]>();

	constructor(private http: HttpClient) {}

	getMessages() {
		this.http
			.get<{response: string, messages: Message[]}>
				('http://localhost:3000/api/messages')
			.pipe(map((messagesData) => {
				return messagesData.messages.map(message => {
					return {
						title: message.title,
						content: message.content,
						color: message.color,
						id: message.id,
					};
				});
			}))
			.subscribe((transformedMessages) => {
			 	this.messages = transformedMessages;
			 	this.messagesUpdated.next([...this.messages]);
			});
	}

	getMessagesUpdateListener() {
		return this.messagesUpdated.asObservable();
	}

	addMessage(title: string, content: string, color: string) {

		const message: Message = {
									id: null,
									title: title,
									content: content,
									color: color
								 }

		this.http.post<{message: string}>('http://localhost:3000/api/messages', message)
				 .subscribe((responseData) => {
				 	console.log(responseData.message);
				 	this.messages.push(message);
					this.messagesUpdated.next([...this.messages]);
				 })
	}
}
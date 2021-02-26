import { Component } from '@angular/core';
import { MessageCreateComponent } from './message-create/message-create.component';

@Component({
	selector: 'app-message-board',
	templateUrl: './message-board.component.html'
})
export class MessageBoardComponent {
	storedMessages = [];

	onMessageAdded(message) {
		this.storedMessages.push(message);
	}
}
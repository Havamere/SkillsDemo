import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-message-create',
	templateUrl: './message-create.component.html',
	styleUrls: ['./message-create.component.sass']
})
export class MessageCreateComponent {
	selectedColor ='';
	enteredTitle = '';
	enteredContent = '';
	@Output() messageCreated = new EventEmitter();

	onAddMessage() {
		const message = {
			title: this.enteredTitle,
			content: this.enteredContent,
			color: this.selectedColor
		};
		this.messageCreated.emit(message);
	}
}
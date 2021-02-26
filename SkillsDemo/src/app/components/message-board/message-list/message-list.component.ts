import { Component, Input } from "@angular/core";

@Component({
	selector: 'app-message-list',
	templateUrl: '/message-list.component.html',
	styleUrls: ['./message-list.component.sass']
})
export class MessageListComponent {
	// messages = [
	// 	{title: 'First Post', content: 'This is the first message\'s content.', color: 'is-success'},
	// 	{title: 'Second Post', content: 'This is the second message\'s content.', color: 'is-warning'},
	// 	{title: 'Third Post', content: 'This is the third message\'s content.', color: 'is-link'}
	// ]
	@Input() messages = [];
}
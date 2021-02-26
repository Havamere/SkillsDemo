import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-message-create',
	templateUrl: './message-create.component.html',
	styleUrls: ['./message-create.component.sass']
})
export class MessageCreateComponent {
	selectedColor = '';
	enteredTitle = '';
	enteredContent = '';

	messageColorArray = [

		{
			name: 'White', 
			value: 'is-white', 
			style: 'background-color: hsl(0, 0%, 100%)', 
			font_color: 'hsl(0, 0%, 4%)'
		},
		{
			name: 'Dark Blue', 
			value: 'is-link', 
			style: 'background-color: hsl(217, 71%, 53%)', 
			font_color: '#fff'
		},
		{
			name: 'Light Blue', 
			value: 'is-info', 
			style: 'background-color: hsl(204, 86%, 53%)', 
			font_color: '#fff'
		},
		{
			name: 'Aqua', 
			value: 'is-primary', 
			style: 'background-color: hsl(171, 100%, 41%)', 
			font_color: '#fff'
		},
		{
			name: 'Green', 
			value: 'is-success', 
			style: 'background-color: hsl(141, 53%, 53%)', 
			font_color: '#fff'
		},
		{
			name: 'Orange', 
			value: 'is-warning', 
			style: 'background-color: hsl(48, 100%, 67%)', 
			font_color: 'rgba(0, 0, 0, 0.7)'
		},
		{
			name: 'Red', 
			value: 'is-danger', 
			style: 'background-color: hsl(348, 100%, 61%)', 
			font_color: '#fff'
		},
		{
			name: 'Light', 
			value: 'is-light', 
			style: 'background-color: hsl(0, 0%, 96%)', 
			font_color: 'hsl(0, 0%, 96%)'
		}

	];

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
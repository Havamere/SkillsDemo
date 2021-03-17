import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessagesService } from '../messages.service';

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
			name: 'Dark Blue', 
			value: 'is-link', 
			style: 'background-color: hsl(217, 71%, 53%)'
		},
		{
			name: 'Light Blue', 
			value: 'is-info', 
			style: 'background-color: hsl(204, 86%, 53%)'
		},
		{
			name: 'Aqua', 
			value: 'is-primary', 
			style: 'background-color: hsl(171, 100%, 41%)'
		},
		{
			name: 'Green', 
			value: 'is-success', 
			style: 'background-color: hsl(141, 53%, 53%)'
		},
		{
			name: 'Orange', 
			value: 'is-warning', 
			style: 'background-color: hsl(48, 100%, 67%)'
		},
		{
			name: 'Red', 
			value: 'is-danger', 
			style: 'background-color: hsl(348, 100%, 61%)'
		},
		{
			name: 'Light', 
			value: 'is-light', 
			style: 'background-color: hsl(0, 0%, 96%)'
		}

	];

	constructor(public messagesService: MessagesService) {}

	onAddMessage(form: NgForm) {
		if (form.invalid) {
			alert("Please include a title, a message, and a color selection.");
			return;
		}

		this.messagesService.addMessage(form.value.title, form.value.content, form.value.color);
		form.resetForm();
	}
}
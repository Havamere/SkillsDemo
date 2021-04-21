import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MessagesService } from '../messages.service';
import { MessageColorArray } from './message-colors.component';
import { Message } from '../message.model';
import { mimeType } from './mime-type.validator' ;



@Component({
	selector: 'app-message-create',
	templateUrl: './message-create.component.html',
	styleUrls: ['./message-create.component.sass']
})
export class MessageCreateComponent {
	selectedColor = '';
	enteredTitle = '';
	enteredContent = '';
	messageColorArray = MessageColorArray;
	message: Message;
	form: FormGroup;
	imagePreview: string;
	private messageId: string;
	private mode = 'create';

	constructor(
		public messagesService: MessagesService, 
		public route: ActivatedRoute) {}

	ngOnInit() {
		this.form = new FormGroup({
			'title': new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			'content': new FormControl(null, {
				validators: [Validators.required]
			}),
			'color': new FormControl(null, {
				validators: [Validators.required]
			}),
			'image': new FormControl(null, {
				validators: [Validators.required],
				asyncValidators: [mimeType]
			})
		});
		this.route.paramMap.subscribe((paramMap: ParamMap) => {
			if (paramMap.has('messageId')) {
				this.mode = 'edit';
				this.messageId = paramMap.get('messageId');
				this.messagesService.getMessage(this.messageId).subscribe(messageData => {
					this.message = {
						id: messageData._id, 
						title: messageData.title, 
						content: messageData.content, 
						color: messageData.color,
						imagePath: messageData.imagePath
					}
				});
				this.form.setValue({
					'title': this.message.title,
					'content': this.message.content,
					'color': this.message.color,
					'image': this.message.imagePath
				});
			} else {
				this.mode = 'create';
				this.messageId = null;
			}
		});
	}

	onImagePicked(event: Event) {
		const file = (event.target as HTMLInputElement).files[0];
		this.form.patchValue({image: file});
		this.form.get('image').updateValueAndValidity();
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result as string;
		}
		reader.readAsDataURL(file);
	}

	onSaveMessage() {
		if (this.form.invalid) {
			alert("Please include a title, a message, and a color selection.");
			return;
		}
		if (this.mode === 'create') {
			this.messagesService.addMessage(
				this.form.value.title, 
				this.form.value.content, 
				this.form.value.color,
				this.form.value.image);
		} else {
			this.messagesService.updateMessage(
				this.messageId, 
				this.form.value.title, 
				this.form.value.content, 
				this.form.value.color,
				this.form.value.image);
		}
		this.form.reset();
	}
}
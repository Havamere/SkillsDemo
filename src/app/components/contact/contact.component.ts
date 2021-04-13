import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TextService } from './text.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})

export class ContactComponent {

  name: string;
  phoneNumber: string;
  message: string;

  constructor(public textService: TextService) { }

  onSendText(form: NgForm) {
    
    this.textService.outgoingText(form.value.name, form.value.phoneNumber, form.value.message);
    form.resetForm();
    
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Text } from './text.model';

@Injectable({providedIn: 'root'})
export class TextService {
	private text: Text[] = [];

	constructor(private http: HttpClient) {}

	outgoingText( name: string, phoneNumber: string, message: string) {

		const text: Text = {name: name,	phoneNumber: phoneNumber, message: message};
		
		console.log("attempting text");
		this.http.post('http://localhost:3000/api/text', text);
		console.log("did it work?");
	}
}

//look into using a telesign service to import credentials, or change post url's to telesign endpoints
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Text } from './text.model';

@Injectable({providedIn: 'root'})
export class TextService {
	private text: Text[] = [];

	constructor(private http: HttpClient) {}

	outgoingText( name: string, phoneNumber: string, message: string) {

		const text: Text = {name: name,	phoneNumber: phoneNumber, message: message};

		this.http.post<{text: string}>('http://localhost:3000/api/text', text)
				 .subscribe(err=> {console.log(err) });
	}
}

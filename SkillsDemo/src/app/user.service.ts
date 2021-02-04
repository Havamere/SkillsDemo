import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class UserService {
	// define our class properties. apiUrl is what we need
    // usually you could get this from an environment file
	apiUrl = 'https://api.github.com/users';

	// inject the HttpClient as http so we can use it in this class
	constructor(private http: HttpClient) {}

	// return what comes back from this http call
	getUsers() {
	    return this.http.get(`${this.apiUrl}?per_page=10`);
	}
	// returns a single user
	getUser(username: string) {
		return this.http.get(`${this.apiUrl}/${username}`);
	}
}

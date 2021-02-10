import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class JokesService {
  //service api
  apiURL = 'https://v2.jokeapi.dev/joke/';

  constructor(private http: HttpClient) {}

  //optional filters
  numJokes = 10;
  //add more than one category using comma separation
  categories = 'Programming'; //options: Programming,Misc,Dark,Pun,Spooky,Christmas or 'Any' for all categories
  //add more than one flag using comma separation
  blacklistFlags = 'nsfw,racist,sexist,explicit'; //options: explicit,nsfw,political,racist,religious,sexist

  getJokes() {
  	
  	return this.http
  				.get(`${this.apiURL}${this.categories}?blacklistFlags=${this.blacklistFlags}&amount=${this.numJokes}`); 
  }
}
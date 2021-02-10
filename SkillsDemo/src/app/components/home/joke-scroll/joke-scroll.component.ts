import { Component, OnInit } from '@angular/core';
import { JokesService } from '../../../jokes.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-joke-scroll',
  templateUrl: './joke-scroll.component.html',
  styleUrls: ['./joke-scroll.component.sass']
})
export class JokeScrollComponent implements OnInit {

  jokesArr;

  constructor(private jokesService: JokesService) { }

  ngOnInit(): void {
  	function getTypeName(val) {
    	return {}.toString.call(val).slice(8, -1);
	}

  	this.jokesArr = this.jokesService.getJokes()
  				.pipe(map(data => {
						const jokesArr = [];
						for (let i=0; i<10; i++) {
							jokesArr.push(data['jokes'][i]);
						}
						return jokesArr;
					}))
				.subscribe(data => console.log("Payload = ", getTypeName(data), data));
  	console.log(this.jokesArr);
  }

}

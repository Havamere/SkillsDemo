import { Component, OnInit } from '@angular/core';
import { JokesService } from '../../../jokes.service';

@Component({
  selector: 'app-joke-scroll',
  templateUrl: './joke-scroll.component.html',
  styleUrls: ['./joke-scroll.component.sass']
})

export class JokeScrollComponent implements OnInit {

  jokesArr;

  constructor(private jokesService: JokesService) { }

  ngOnInit(): void {
 //  	function getTypeName(val) {
 //    	return {}.toString.call(val).slice(8, -1);
 // }

  	this.jokesService.getJokes().subscribe(data => this.jokesArr = data);
  												//console.log("Payload = ", getTypeName(data), data);
  	//console.log(this.jokesArr);
  }

}

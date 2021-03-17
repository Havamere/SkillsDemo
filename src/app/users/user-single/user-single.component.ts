import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-single',
  templateUrl: './user-single.component.html',
  styleUrls: ['./user-single.component.sass']
})
export class UserSingleComponent implements OnInit {

	user;

  constructor(
  	private route: ActivatedRoute,
  	private userService: UserService
  	) { }

  //watch route params for changes
  //every time it changes or on first load, go get a user from userService
  ngOnInit(): void {
  	this.route.params.subscribe(params => {
  		// get the username from the route params
  		const username = params['username'];

  		//now to get user data from GitHub
  		this.userService
  			.getUser(username)
  			.subscribe(user => this.user = user);
  	});
  }

}

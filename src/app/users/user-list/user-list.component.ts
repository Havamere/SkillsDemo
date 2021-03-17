import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  users;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  	this.users = this.userService.getUsers();
  	console.log(this.users);
  }

}

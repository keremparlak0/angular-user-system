import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$: Observable<any>;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.users$ = this.userService.getUsers()
  }
}

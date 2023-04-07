import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users$: Observable<any>;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.users$ = this.userService.getUsers()
  }
}

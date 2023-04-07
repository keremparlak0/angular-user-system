import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  users$: Observable<any> | any;
  id: number;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUser()
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log(id);

  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup()
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(2)]),
      fullname: new FormControl("", [Validators.required, Validators.minLength(2)]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)]),
      role: new FormControl("", [Validators.required, Validators.minLength(3)]),
    })
  }

  signup(): void {
    console.log(this.signupForm.value);
    this.userService
      .signup(this.signupForm.value)
      .subscribe((msg) => console.log(msg))

  }
}

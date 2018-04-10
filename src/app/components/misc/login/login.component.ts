import { UsersService } from './../../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { User } from './../../../shared/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  apiError: string;
  signup: boolean = false;

  constructor(
    private sessionService: SessionService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitLogin(loginForm) {
    this.sessionService.authenticate(this.user).subscribe(
      (user) => {
        loginForm.reset();
        this.router.navigate(['']);
      },
      (error) => {
        this.apiError = error.message;
      }
    );
  }

  onSubmitSignup(signupForm) {
    this.usersService.create(this.user).subscribe(
      (user) => {
        signupForm.reset();
        this.onSubmitLogin(signupForm);
      },
      (error) => {
        this.apiError = error.message;
      }
    );
  }

  changeToSignup() {
    this.signup = !this.signup;
  }


}

import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { SessionService } from './../../../shared/services/session.service';
import { UsersService } from './../../../shared/services/users.service';
import { User } from './../../../shared/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User = new User();
  userSubscription: Subscription;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sessionService.getUserInfo()
      .subscribe(user => this.user = user)
    console.log(this.user)
  }
}
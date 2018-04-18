import { Router } from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { UsersService } from './../../../shared/services/users.service';
import { User } from './../../../shared/model/user.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    this.userSubscription = this.sessionService.onUserChanges()
      .subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onClickLogout() {
    this.sessionService.logout()
      .subscribe(() => {
        this.router.navigate(['']);
      });
    }
}

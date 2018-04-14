import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import './rxjs.operators';

import { SessionService } from './shared/services/session.service';
import { UsersService } from './shared/services/users.service';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/misc/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/misc/navbar/navbar.component';
import { ContactCreateComponent } from './components/contact/contact-create/contact-create.component';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { ContactItemComponent } from './components/contact/contact-item/contact-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ContactCreateComponent,
    ContactListComponent,
    ContactItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    SessionService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { GlobalErrorHandlerService } from './shared/services/global-error-handler.service';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import './rxjs.operators';

import { SessionService } from './shared/services/session.service';
import { UsersService } from './shared/services/users.service';
import { ContactsService } from './shared/services/contacts.service';
import { EventService } from './shared/services/event.service';

import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/misc/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/misc/navbar/navbar.component';
import { ContactCreateComponent } from './components/contact/contact-create/contact-create.component';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { ContactItemComponent } from './components/contact/contact-item/contact-item.component';
import { EventCreateComponent } from './components/event/event-create/event-create.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { ProfileComponent } from './components/misc/profile/profile.component';
import { SearchPipe } from './pipes/search.pipe';
import { ContactEditComponent } from './components/contact/contact-edit/contact-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ContactCreateComponent,
    ContactListComponent,
    ContactItemComponent,
    EventCreateComponent,
    EventListComponent,
    ProfileComponent,
    SearchPipe,
    ContactEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FileUploadModule,
  ],
  providers: [
    SessionService,
    UsersService,
    ContactsService,
    EventService,
    IsAuthenticatedGuard,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

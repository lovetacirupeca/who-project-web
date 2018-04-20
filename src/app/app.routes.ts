import { Component } from '@angular/core';
import { Routes, CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactCreateComponent } from './components/contact/contact-create/contact-create.component';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { ContactItemComponent } from './components/contact/contact-item/contact-item.component';
import { ContactEditComponent } from './components/contact/contact-edit/contact-edit.component';
import { EventCreateComponent } from './components/event/event-create/event-create.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { ProfileComponent } from './components/misc/profile/profile.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create', canActivate: [IsAuthenticatedGuard], component: ContactCreateComponent },
    { path: 'contact/:id', canActivate: [IsAuthenticatedGuard], component: ContactItemComponent },
    { path: 'contact/edit/:id', canActivate: [IsAuthenticatedGuard], component: ContactEditComponent },
    { path: 'events', canActivate: [IsAuthenticatedGuard], component: EventListComponent },
    { path: 'events/create', canActivate: [IsAuthenticatedGuard], component: EventCreateComponent },
    { path: 'events/edit/:id', canActivate: [IsAuthenticatedGuard], component: ContactEditComponent },
    { path: 'profile', canActivate: [IsAuthenticatedGuard], component: ProfileComponent },
    
];
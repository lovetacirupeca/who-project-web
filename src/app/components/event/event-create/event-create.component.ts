import { Contact } from './../../../shared/model/contact.model';
import { User } from './../../../shared/model/user.model';
import { SessionService } from './../../../shared/services/session.service';
import { ContactsService } from './../../../shared/services/contacts.service';
import { Component, OnInit } from '@angular/core';
import { Event } from './../../../shared/model/event.model';
import { EventService } from '../../../shared/services/event.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  event: Event = new Event();
  apiError: string;
  user: User = new User();
  contacts: Array<Contact> = [];
  selectedValue: string;
  contactList: Array<Contact> = [];
  
  constructor(
    private router: Router,
    private eventService: EventService,
    private contactsService: ContactsService,
    private sessionService: SessionService
  ) {}

  ngOnInit(){
    this.user = this.sessionService.getUser();
    this.contactsService.list()
      .subscribe((contacts) => {this.contacts = contacts
      console.log(this.contacts)
      });
  }

  addComment(comment: HTMLInputElement) {
    if (comment.value) {
      this.event.comments.push(comment.value);
      comment.value = '';
    }
  }
  removeComment(comment: string) {
    this.event.comments = this.event.comments.filter(s => s !== comment);
  }

  onSubmitEvent(eventForm: NgForm) {
    this.eventService.create(this.event, this.contactList).subscribe(
      (event) => {
        eventForm.reset();
        this.router.navigate(['events']);
      },
      (error) => {
        this.apiError = error.message;
      }
    );
  }

  addContactToList(e) {
    const contact = e.target.value
      ? this.contacts.find(el => el.name === e.target.value)
      : null;
    if (contact) {
      this.contactList.indexOf(contact) === -1 
        ? this.contactList.push(contact)
        : this.contactList.splice(this.contactList.indexOf(contact), 1)
    }
  }
}

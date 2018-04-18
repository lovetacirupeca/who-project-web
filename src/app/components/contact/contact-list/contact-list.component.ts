import { Contact } from './../../../shared/model/contact.model';
import { ContactsService } from './../../../shared/services/contacts.service';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { User } from '../../../shared/model/user.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],

})
export class ContactListComponent implements OnInit {
  contacts: Array<Contact> = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.list()
      .subscribe((contacts) => this.contacts = contacts);
  }

}

import { Contact } from './../../../shared/model/contact.model';
import { ContactsService } from './../../../shared/services/contacts.service';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, value: string): any[] {
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }

    const myPattern = new RegExp(value, 'i');
    return items.filter(it => {
      let isOk = 0;
      for (let i = 0; i < it.categories.length; i++) {
        if (it.categories[i].match(myPattern))
          isOk++;
      }
      if (isOk > 0) {
        return it;
      }
    }
    )
  }

}
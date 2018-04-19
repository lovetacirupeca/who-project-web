import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './../../../shared/model/contact.model';
import { ContactsService } from './../../../shared/services/contacts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  contact: Contact = new Contact();
  id: string;
  error: Object;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
    
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        this.contactsService.get(this.id)
          .subscribe(data => {
            this.contact = data;
          });
      }
    });
  }


  onClickDelete() {
      this.contactsService.delete(this.contact.id)
        .subscribe(() => {
          this.router.navigate(['']);
        })
  }
}
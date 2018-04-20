import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from './../../../shared/model/contact.model';
import { ContactsService } from './../../../shared/services/contacts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { FileUploader } from "ng2-file-upload";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = new Contact();
  id: string;
  apiError: string;
  uploader: FileUploader;

  @ViewChild('imageFile') imageFile;
  @ViewChild('contactForm') contactForm;

  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: `${environment.baseApi}/contact/edit`
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        this.contactsService.get(this.id)
          .subscribe((data) => {
            this.contact = data;
          });
      }
    });
  }

  addNote(note: HTMLInputElement) {
    if (note.value) {
      this.contact.notes.push(note.value);
      note.value = '';
    }
  }
  removeNote(note: string) {
    this.contact.notes = this.contact.notes.filter(s => s !== note);
  }

  addCategory(category: HTMLInputElement) {
    if (category.value) {
      this.contact.categories.push(category.value);
      category.value = '';
    }
  }
  removeCategory(category: string) {
    this.contact.categories = this.contact.categories.filter(s => s !== category);
  }

  onEditContact(contactForm: NgForm) {
    this.contactsService.edit(this.contact)
      .subscribe(
        (contact) => {
          contactForm.reset();
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
          this.apiError = error;
        }
      );
  }
}

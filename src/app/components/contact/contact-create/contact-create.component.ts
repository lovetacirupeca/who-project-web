import { ContactsService } from './../../../shared/services/contacts.service';
import { Contact } from './../../../shared/model/contact.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
  contact: Contact = new Contact();
  apiError: string;
  @ViewChild('image') image;
  @ViewChild('contactForm') contactForm;


  constructor(
    private router: Router,
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
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

  onSubmitContact(contactForm: NgForm) {
    const image = this.image.nativeElement;
    if (image.files && image.files[0]) {
      this.contact.image = image.files[0];
    }
    this.contactsService.create(this.contact)
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

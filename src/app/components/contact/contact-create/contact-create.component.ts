import { environment } from './../../../../environments/environment';
import { ContactsService } from './../../../shared/services/contacts.service';
import { Contact } from './../../../shared/model/contact.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {
  contact: Contact = new Contact();
  apiError: string;
  uploader: FileUploader;

  @ViewChild('imageFile') imageFile;
  @ViewChild('contactForm') contactForm;


  constructor(
    private router: Router,
    private contactsService: ContactsService
  ) { }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: `${environment.BASE_API}/contact/new`
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

  onSubmitContact(contactForm: NgForm) {

    if(this.contact.image) {      
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('name', this.contact.name);
        form.append('job', this.contact.job);
        form.append('notes', this.contact.notes);
        form.append('categories', this.contact.categories);
      };
      this.uploader.uploadAll();
      setTimeout(() => this.router.navigate(['']), 2500);
    } else {
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

  
}

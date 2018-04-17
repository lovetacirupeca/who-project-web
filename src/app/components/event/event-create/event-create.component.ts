import { Component } from '@angular/core';
import { Event } from './../../../shared/model/event.model';
import { EventService } from '../../../shared/services/event.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  event: Event = new Event();
  apiError: string;

  constructor(
    private router: Router,
    private eventService: EventService
  ) {}

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
    this.eventService.create(this.event).subscribe(
      (event) => {
        eventForm.reset();
        this.router.navigate(['events']);
      },
      (error) => {
        this.apiError = error.message;
      }
    );
  }
}

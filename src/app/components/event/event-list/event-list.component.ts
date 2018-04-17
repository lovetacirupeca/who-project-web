import { SessionService } from './../../../shared/services/session.service';
import { EventService } from '../../../shared/services/event.service';
import { Event } from './../../../shared/model/event.model';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  event: Array<Event> = [];

  constructor(
    private eventService: EventService,
    private router: Router
) { }

  ngOnInit() {
    this.eventService.list()
      .subscribe((event) => this.event = event);
  }

  onClickDelete(id: string) {
    this.eventService.delete(id)
      .subscribe(() => {
        this.event = this.event.filter(event => event.id !== id);
      });
  }

}

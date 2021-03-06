import { Contact } from './../model/contact.model';
import { BaseApiService } from './base-api.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Event } from '../model/event.model';

@Injectable()
export class EventService extends BaseApiService {
    private static readonly EVENT_API = `${BaseApiService.BASE_API}/event`;

    constructor(private http: Http) {
        super();
    }

    list(): Observable<Array<Event>> {
        return this.http.get(EventService.EVENT_API, BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

    get(id: string): Observable<Event> {
        return this.http.get(`${EventService.EVENT_API}/${id}`, BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

    create(event: Event, contactList: Array<Contact>): Observable<Event> {
        const eventBody = {
            ...event,
            contacts: contactList.map(e => e.id),
        }
        return this.http.post(`${EventService.EVENT_API}/new`, eventBody, BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

    edit(event: Event): Observable<Event> {
        return this.http.put(`${EventService.EVENT_API}/edit/${event.id}`, event, BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

    delete(id: string): Observable<void> {
        return this.http.delete(`${EventService.EVENT_API}/delete/${id}`, BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

}
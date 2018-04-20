import { BaseApiService } from './base-api.service';
import { Contact } from '../model/contact.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ContactsService extends BaseApiService {
    private static readonly CONTACTS_API = `${BaseApiService.BASE_API}/contact`;

    constructor(private http: Http) {
        super();
    }

    list(): Observable<Array<Contact>> {
        return this.http.get(ContactsService.CONTACTS_API, BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

    get(id: string): Observable<Contact> {
        return this.http.get(`${ContactsService.CONTACTS_API}/${id}`, BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

    create(contact: Contact): Observable<Contact> {
        console.log(contact.name)
        return this.http.post(`${ContactsService.CONTACTS_API}/new`, JSON.stringify(contact), BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

    edit(contact: Contact): Observable<Contact> {
        return this.http.put(`${ContactsService.CONTACTS_API}/edit/${contact.id}`, JSON.stringify(contact), BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

    delete(id: string): Observable<void> {
        return this.http.delete(`${ContactsService.CONTACTS_API}/${id}`, BaseApiService.defaultOptions)
            .map((res: Response) => res.json())
            .catch(error => this.handleError(error));
    }

}
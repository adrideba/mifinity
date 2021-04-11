import { Addresses } from './../models/addresses';
import { ContactsDto } from './../models/dto/contactsDto';
import { environment } from './../../environments/environment';
import { Contacts } from './../models/contacts';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  apiUrl = `${environment.apiUrl}`;
  contacts: Contacts;
  addresses: Addresses[];

  constructor(
    private http: HttpClient) { }

  getContacts(): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(`${this.apiUrl}/contacts`);
  }

  getContactById(id: number): Observable<any> {
    const contacts = this.http.get<Contacts>(`${this.apiUrl}/contacts/${id}`);
    const addresses = this.http.get<Addresses[]>(`${this.apiUrl}/contacts/${id}/addresses`);
    return forkJoin([contacts, addresses]).pipe(map(res => {
      this.contacts = res[0]
      this.contacts.addresses = [] = res[1];
      return this.contacts;
    }
    ));
  }

  addContact(newContact: ContactsDto): Observable<Contacts> {
    let body = new URLSearchParams();
    body.set('first_name', newContact.first_name);
    body.set('last_name', newContact.last_name);

    return this.http.post<Contacts>(`${this.apiUrl}/contacts`, body.toString());
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contacts/${id}`);
  }
}

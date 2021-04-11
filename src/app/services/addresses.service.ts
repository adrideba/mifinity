import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Addresses } from './../models/addresses';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient) { }

  saveAddresses(addresses: any, contactId: number): Observable<any> {
    const arr: any[] = [];
    addresses.addresses.forEach(a => {
      let body = new URLSearchParams();
      body.set('street1', a.street1);
      body.set('street2', a.street2);
      body.set('town', a.town);
      body.set('country', a.country);
      body.set('contactId', String(contactId));

      if (a.state == 0) {
        arr.push(this.http.post<Addresses>(`${this.apiUrl}/contacts/${contactId}/addresses`, body.toString()));
      }
      else if (a.state == 1) {
        arr.push(this.http.put<Addresses>(`${this.apiUrl}/addresses/${a.id}`, body.toString()));
      }
    });

    return forkJoin(arr).pipe(map(res => {
      return res;
    }));
  }

  deleteAddress(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/addresses/${id}`);
  }
}

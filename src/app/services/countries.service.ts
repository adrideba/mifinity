import { Countries } from './../models/countries';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  apiUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient) { }

  getCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(`${this.apiUrl}/countries`);
  }
}

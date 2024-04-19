import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookRequest } from 'src/app/models/ContactInformations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl: string = "http://127.0.0.1:8000/api"
  constructor(private http: HttpClient) {}

  public postBookRequest(bookRequest: BookRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, bookRequest);
  }
}

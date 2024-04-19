import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRequest, BookResponse } from 'src/app/models/ContactInformations';

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  private baseUrl: string = "http://127.0.0.1:8000/api"
  constructor(private http: HttpClient) {}

  public getAllReservations(): Observable<BookResponse[]> {
    return this.http.get<BookResponse[]>(`${this.baseUrl}/reservations`);
  }

  public postBookRequest(bookRequest: BookRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, bookRequest);
  }
}

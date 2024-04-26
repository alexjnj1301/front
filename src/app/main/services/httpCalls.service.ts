import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateBookRequest } from 'src/app/enums/admin';
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

  public updateReservation(id: number, requestBody: UpdateBookRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/reservations/${id}`, requestBody);
  }

  public deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reservations/${id}`);
  }
}

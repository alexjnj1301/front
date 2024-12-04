import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LoginRequest, LoginResponse } from '../../models/LoginModels'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = environment.apiUrl + '/auth'

  constructor(private http: HttpClient) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest)
  }
}

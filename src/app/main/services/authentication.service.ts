import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LoginRequest, LoginResponse } from '../../models/LoginModels'
import { Router } from '@angular/router'
import { Constants } from '../Constants'
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = environment.apiUrl + '/auth'

  constructor(private router: Router,
              private constants: Constants,
              private httpClient: HttpClient) {}

  public isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) {
      return false
    }

    return !this.isTokenExpired(token)
  }

  public getToken(): string | null {
    return localStorage.getItem(this.constants.TOKEN_KEY)
  }

  public isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode(token)
      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.exp! < currentTime
    } catch (error) {
      console.error('Erreur lors de la vérification du token', error)
      return true
    }
  }

  public logout(): void {
    localStorage.removeItem(this.constants.TOKEN_KEY)
    // this.router.navigate(['/login'])
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest)
  }
}

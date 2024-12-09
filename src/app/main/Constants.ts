import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class Constants {
  public readonly TOKEN_KEY = 'token'
  public readonly CURRENT_USER_KEY = 'currentUser'
}

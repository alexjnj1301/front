import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class Constants {
  public readonly TOKEN_KEY = 'token'
  public readonly CURRENT_USER_KEY = 'currentUser'
  public readonly REPLACEMENT_PICTURE = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'
}

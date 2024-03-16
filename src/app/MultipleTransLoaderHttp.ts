import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable, forkJoin, map } from "rxjs";
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})

export class MultipleTransLoaderHttp implements TranslateLoader {
  private defaultLang: string = "fr"
  private currentLang: string = ""

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  getTranslation(): Observable<any> {
    return forkJoin([
      this.http.get(`./assets/i18n/error_page/${this.getLang()}.json`),
    ]).pipe(
      map((translations) => {
        return Object.assign({}, ...translations);
      })
    );
  }

  setLang(lang: string) {
    this.cookieService.set('lang', lang, undefined, '/');
  }

  getLang() {
    this.currentLang = this.cookieService.get('lang') ? this.cookieService.get('lang') : this.defaultLang;
    console.log(this.currentLang);
    return this.currentLang;
  }
}

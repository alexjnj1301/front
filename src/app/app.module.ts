import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomePageComponent } from './main/components/home-page/home-page.component'
import { ContactComponent } from './main/components/contact/contact.component'
import { ErrorPageComponent } from './main/components/error-page/error-page.component'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'

export function createTranslateLoader(http: HttpClient, cookieService: CookieService) {
  return new MultipleTransLoaderHttp(http, cookieService);
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

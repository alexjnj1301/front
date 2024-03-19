import { Component } from '@angular/core'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ChezToph'
  selectedLanguage: string
  translateValues: any = {}

  constructor(private translateService: MultipleTransLoaderHttp) {
    this.selectedLanguage = this.translateService.getLang()
    this.translateService.setLang(this.selectedLanguage)
  }
}

import { Component } from '@angular/core'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'ChezToph'
  public selectedLanguage: string
  public translateValues: any = {}
  public isLoading: boolean = false

  constructor(private translateService: MultipleTransLoaderHttp) {
    this.selectedLanguage = this.translateService.getLang()
    this.translateService.setLang(this.selectedLanguage)
  }

  public setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading
  }
}

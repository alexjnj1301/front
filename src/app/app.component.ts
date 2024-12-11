import { Component } from '@angular/core'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'Loc\'Ngo'
  public selectedLanguage: string
  public translateValues: any = {}
  public isLoading: boolean = false

  constructor(private translateService: MultipleTransLoaderHttp,
              private translate: TranslateService) {
    this.selectedLanguage = this.translateService.getLang() || 'fr'
    this.translateService.setLang(this.selectedLanguage)
    this.translate.use(this.selectedLanguage);
  }

  public setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading
  }
}

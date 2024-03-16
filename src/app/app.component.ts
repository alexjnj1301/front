import { Component, OnInit } from '@angular/core'
import { MultipleTransLoaderHttp } from './MultipleTransLoaderHttp'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ChezToph';
  selectedLanguage: string = this.translate.getLang()

  constructor(private translate: MultipleTransLoaderHttp) { }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit')
    this.translate.setLang(this.selectedLanguage)
  }
}

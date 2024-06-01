import { Component, OnInit } from '@angular/core';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';
import { AppComponent } from "../../../app.component"

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public homePageTranslateValues: any = {}

  constructor(private translateValues: MultipleTransLoaderHttp,
              public appComponent: AppComponent) { }

  public ngOnInit(): void {
    this.appComponent.setIsLoading(true)
    this.translateValues.getTranslation().subscribe((result) => {
      this.homePageTranslateValues = result.homePage;
    })
    setTimeout(() => {
      this.appComponent.setIsLoading(false)
    }, 1000)
  }
}

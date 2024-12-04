import { Component, OnInit } from '@angular/core';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';
import { AuthenticationService } from '../../services/authentication.service'
import { Constants } from '../../Constants'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public homePageTranslateValues: any = {}

  constructor(private translateValues: MultipleTransLoaderHttp,
              private authenticationService: AuthenticationService,
              private constants: Constants) { }

  public ngOnInit(): void {
    this.translateValues.getTranslation().subscribe((result) => {
      this.homePageTranslateValues = result.homePage;
    })
  }

  public test(): void {
    console.log('expired', this.authenticationService.isTokenExpired(localStorage.getItem(this.constants.TOKEN_KEY)!))
  }
}

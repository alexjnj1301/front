import { Component, OnInit } from '@angular/core';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';
import { AuthenticationService } from '../../services/authentication.service'
import { Constants } from '../../Constants'
import { AllLieuResponse } from '../../../models/LieuModels'
import { HttpCallsService } from '../../services/httpCalls.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public listLieux: AllLieuResponse[] = []

  constructor(private authenticationService: AuthenticationService,
              private httpCallsService: HttpCallsService,
              private constants: Constants) { }

  public ngOnInit(): void {
    this.getAllLieu()
  }

  private getAllLieu() {
    this.httpCallsService.getAllLieu().subscribe({
      next: (response) => {
        this.listLieux = response
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
}

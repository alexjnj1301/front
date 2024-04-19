import { Component, OnInit } from '@angular/core';
import { BookResponse } from 'src/app/models/ContactInformations';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';
import { HttpCallsService } from '../../services/httpCalls.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  public reservationList: BookResponse[] = []
  public homePageTranslateValues: any = {}

  constructor(private httpService: HttpCallsService,
    private translateValues: MultipleTransLoaderHttp) { }

  public ngOnInit(): void {
    this.translateValues.getTranslation().subscribe((result) => {
      this.homePageTranslateValues = result.homePage;
    })
    this.httpService.getAllReservations().subscribe({
      next: (reservations: BookResponse[]) => {
        this.reservationList = reservations;
        console.log(this.reservationList);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  public seeDetails(id: number): void {
    console.log(id);
  }

  public deleteReservation(id: number): void {
    console.log(id);
  }
}

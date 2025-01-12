import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AppComponent } from '../../../app.component'
import { HttpCallsService } from '../../services/httpCalls.service'
import { LieuDetailsResponse } from '../../../models/LieuModels'
import { Tile } from '../../../models/Tile'
import { Observable, tap, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Constants } from '../../Constants'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { MatDatepickerToggle } from '@angular/material/datepicker'
import * as moment from 'moment'

@Component({
  selector: 'app-lieu-details',
  templateUrl: './lieu-details.component.html',
  styleUrl: './lieu-details.component.scss'
})
export class LieuDetailsComponent implements OnInit {
  @ViewChild('picker') public picker! : MatDatepickerToggle<Date>

  public lieuId: string = ''
  public tiles: Tile[] = []
  public lieuDetails: LieuDetailsResponse | null = null
  public bookForm: FormGroup
  public startDateOui: string | null = null
  public isImageLoaded: boolean = false
  public minDate: Date
  public maxDate: Date
  public dtf: string = 'dd-MM-yyyy'

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private appComponent: AppComponent,
              private httpCallsService: HttpCallsService,
              public constants: Constants) {
    this.bookForm = this.formBuilder.group({
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
    })
    this.minDate = new Date()
    this.maxDate = moment(this.minDate).add(1, 'years').toDate()
  }

  public ngOnInit(): void {
    this.lieuId = this.route.snapshot.paramMap.get('id')!

    this.getLieuDetails().subscribe({
      next: (response: LieuDetailsResponse) => {
        this.lieuDetails = response;
        this.tiles = [
          { img: this.lieuDetails.favorite_picture, cols: 2, rows: 2, class: 'principal-picture' },
          { img: this.lieuDetails.images?.at(0)?.imageUrl ? this.lieuDetails.images.at(0)?.imageUrl : '', cols: 2, rows: 1, class: 'top-right-picture' },
          { img: this.lieuDetails.images?.at(1)?.imageUrl ? this.lieuDetails.images.at(1)?.imageUrl : '', cols: 1, rows: 1, class: 'bottom-right-left' },
          { img: this.lieuDetails.images?.at(1)?.imageUrl ? this.lieuDetails.images.at(1)?.imageUrl : '', cols: 1, rows: 1, class: 'bottom-right-right' }
        ];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails du lieu:', err);
      }
    })
    this.isImageLoaded = false
  }

  public get startDate(): string | null {
    return this.bookForm.get('startDate')?.value
  }

  public get endDate(): string | null {
    return this.bookForm.get('endDate')?.value
  }

  public getLieuDetails(): Observable<LieuDetailsResponse> {
    setTimeout(() =>this.appComponent.setIsLoading(true))
    return this.httpCallsService.getLieuById(this.lieuId).pipe(
      tap(() => setTimeout(() => this.appComponent.setIsLoading(false))),
      catchError((error) => {
        console.error('get lieu details error:', error)
        this.appComponent.isLoading = false
        return throwError(() => error)
      })
    );
  }

  public onSubmit(): void {
    if (this.bookForm.invalid) {
      return
    }
    console.log('bookForm:', this.bookForm.value)
  }

  public onImageLoad(): void {
    this.isImageLoaded = true
  }

  public onClose() {
    this.startDateOui = this.datePipe.transform(this.startDate, 'yyyy-MM-dd')
  }

  public onStartDateChange() {
    this.maxDate = moment(this.startDate).add(7, 'days').toDate()
  }

  public onEndDateChange() {
    let start = this.datePipe.transform(this.startDate, this.dtf)
    let end = this.datePipe.transform(this.endDate, this.dtf)
    if (end === start) {
      this.bookForm.reset()
    }
  }
}



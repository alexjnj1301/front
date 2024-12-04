import { DatePipe } from '@angular/common';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MAT_DATE_RANGE_SELECTION_STRATEGY, MatDateRangeSelectionStrategy } from '@angular/material/datepicker';
import * as moment from 'moment';
import { HttpCallsService } from 'src/app/main/services/httpCalls.service';
import { BookRequest } from 'src/app/models/ContactInformations';
import { AppComponent } from "../../../../app.component"

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createSevenDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createSevenDayRange(activeDate);
  }

  private _createSevenDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, 7);
      return new DateRange<D>(start, end);
    }
    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy
    }
  ]
})
export class BookFormComponent implements OnInit {
  @Input() public translateValues: any;

  public isLoading = false;
  public bookForm: FormGroup;
  public minDate: Date;
  public maxDate: Date;
  public attendeesList = Array.from({ length: 0 });
  public bookRequest: BookRequest | undefined;
  private excludedDates: Date[] = [];

  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private httpService: HttpCallsService,
              public appComponent: AppComponent) {
    this.bookForm = this.formBuilder.group({
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      numberOfAttendees: [1, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      attendees: this.formBuilder.array([])
    });
    this.minDate = new Date();
    this.maxDate = moment(this.minDate).add(1, 'years').toDate();
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private dateEquals(d1: Date, d2: Date): boolean {
    return d1.getTime() === d2.getTime();
  }

  ngOnInit(): void {
    this.appComponent.setIsLoading(true)
    this.bookForm.get('arrivalDate')?.valueChanges.subscribe(value => {
      this.setDepartureDate(value);
    });
    this.bookForm.get('numberOfAttendees')?.valueChanges.subscribe(value => {
      const numberOfAttendees = Number(value);
      this.attendeesList = Array.from({ length: numberOfAttendees });
      this.updateAttendeesFormArray(numberOfAttendees);
    })
    this.bookForm.get('firstName')?.valueChanges.subscribe(value => {
      this.updateFirstAttendee();
    });

    this.bookForm.get('lastName')?.valueChanges.subscribe(value => {
      this.updateFirstAttendee();
    });
    this.updateAttendeesFormArray(this.nbAttendees);
    this.loadExcludedDates();
    this.appComponent.setIsLoading(false)
  }

  private get startDate(): string | null {
    return this.datePipe.transform(this.bookForm.get('arrivalDate')?.value, 'yyyy-MM-dd')
  }

  private get endDate(): string | null {
    return this.datePipe.transform(this.bookForm.get('departureDate')?.value, 'yyyy-MM-dd')
  }

  public get nbAttendees(): number {
    return this.bookForm.get('numberOfAttendees')?.value
  }

  public get attendeesFormArray() {
    return this.bookForm.get('attendees') as FormArray;
  }

  public get firstName() {
    return this.bookForm.get('firstName')?.value
  }

  public reinitDate() {
    this.bookForm.get('arrivalDate')?.setValue('')
    this.bookForm.get('departureDate')?.setValue('')
  }

  private updateAttendeesFormArray(numberOfAttendees: number) {
    const attendees = this.attendeesFormArray;
    while (attendees.length < numberOfAttendees) {
      attendees.push(this.createAttendeeFormGroup());
    }
    while (attendees.length > numberOfAttendees) {
      attendees.removeAt(attendees.length - 1);
    }
    this.updateFirstAttendee();
  }

  private updateFirstAttendee() {
    const attendeesArray = this.attendeesFormArray;
    if (attendeesArray.length > 0) {
      const firstAttendee = attendeesArray.at(0);
      firstAttendee.get('prenom')?.setValue(this.bookForm.get('firstName')?.value, { emitEvent: false });
      firstAttendee.get('nom')?.setValue(this.bookForm.get('lastName')?.value, { emitEvent: false });
    }
  }

  private setDepartureDate(startDate: Date): void {
    if (startDate) {
      const newEndDate = moment(startDate).add(7, 'days').toDate();
      const currentEndDate = this.bookForm.get('departureDate')?.value;

      if (!moment(currentEndDate).isSame(newEndDate, 'day')) {
        this.bookForm.get('departureDate')?.setValue(newEndDate, { emitEvent: false });
      }
    }
  }

  private createAttendeeFormGroup(): FormGroup {
    return this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required]
    });
  }

  public onBookSubmit(): void {
    this.isLoading = true
    this.appComponent.setIsLoading(true)
    if (this.bookForm.valid) {
      this.bookRequest = {
        name: this.bookForm.get('lastName')?.value,
        firstname: this.bookForm.get('firstName')?.value,
        start_date: this.startDate || '',
        end_date: this.endDate || '',
        nb_person: this.nbAttendees,
        email: this.bookForm.get('email')?.value,
        phone: this.bookForm.get('phone')?.value,
        prix: 0,
        attendees: this.attendeesFormArray.value
      }
      console.log(this.bookRequest);
      this.httpService.postBookRequest(this.bookRequest).subscribe({
        next: () => {
          this.isLoading = false
          this.appComponent.setIsLoading(false)
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false
          this.appComponent.setIsLoading(false)
        }
      })
    }
  }
  public loadExcludedDates(): void {
    this.isLoading = true;
    this.appComponent.setIsLoading(true)
    this.httpService.getAllReservationsBeginDates().subscribe({
      next: (date: string[]) => {
        this.excludedDates = (date.map(d => new Date(d)).map(date => this.normalizeDate(date)));
        console.log(this.excludedDates);
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
        this.appComponent.setIsLoading(false)
      }
    });
  }

  public myFilter = (d: Date | null): boolean => {
    this.excludedDates.map(date => this.normalizeDate(date))
    if (!d) return false;

    const normalizedDate = this.normalizeDate(d);
    const day = normalizedDate.getDay();

    return day === 6 && !this.excludedDates.some(exDate => this.dateEquals(normalizedDate, exDate));
  };
}

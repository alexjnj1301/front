import { DatePipe } from '@angular/common';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DateRange, MAT_DATE_RANGE_SELECTION_STRATEGY, MatDateRangeSelectionStrategy } from '@angular/material/datepicker';
import * as moment from 'moment';
import { HttpCallsService } from 'src/app/main/services/httpCalls.service';
import { BookRequest } from 'src/app/models/ContactInformations';

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
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

  public isLoading = false
  public bookForm: FormGroup
  public minDate: Date
  public maxDate: Date
  public attendeesList = Array.from({ length: 0 })
  public bookRequest: BookRequest | undefined
  public myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day === 6;
  };

  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private httpService: HttpCallsService
    ) {
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
    this.minDate = new Date()
    this.maxDate = moment(this.minDate).add(1, 'years').toDate()
  }

  ngOnInit(): void {
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
    if (this.bookForm.valid) {
      this.bookRequest = {
        nom: this.bookForm.get('lastName')?.value,
        prenom: this.bookForm.get('firstName')?.value,
        dateDebut: this.startDate || '',
        dateFin: this.endDate || '',
        nbPersonnes: this.nbAttendees,
        email: this.bookForm.get('email')?.value,
        telephone: this.bookForm.get('phone')?.value,
        prix: 0,
        attendees: this.attendeesFormArray.value
      }
      this.httpService.postBookRequest(this.bookRequest).subscribe({
        next: () => {
          this.isLoading = false
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false
        }
      })
    }
  }
}

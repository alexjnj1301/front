import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';
import * as moment from 'moment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactForm: FormGroup
  public bookForm: FormGroup
  public contactTranslateValues: any = {}
  public minDate: Date
  public maxDate: Date
  public attendeesList = Array.from({ length: 0 })

  constructor(private formBuilder: FormBuilder,
    private translateValues: MultipleTransLoaderHttp,
    private datePipe: DatePipe) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
    this.bookForm = this.formBuilder.group({
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      numberOfAttendees: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      attendees: this.formBuilder.array([])
    });
    this.minDate = new Date()
    this.maxDate = moment(this.minDate).add(1, 'years').toDate()
  }

  public ngOnInit(): void {
    this.translateValues.getTranslation().subscribe((result) => {
      this.contactTranslateValues = result.contact;
    })
    this.bookForm.get('arrivalDate')?.valueChanges.subscribe(value => {
      this.setMaxDate()
    })
    this.bookForm.get('numberOfAttendees')?.valueChanges.subscribe(value => {
      const numberOfAttendees = Number(value);
      this.attendeesList = Array.from({ length: numberOfAttendees });
    })
    this.bookForm.get('numberOfAttendees')?.valueChanges.subscribe(value => {
      this.updateAttendeesFormArray(Number(value));
    })
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

  private setMaxDate(): void {
    this.maxDate = this.startDate ? moment(this.startDate).add(7, 'day').toDate() : moment(this.minDate).add(1, 'years').toDate()
  }

  public reinitDate() {
    this.bookForm.get('arrivalDate')?.setValue('')
    this.bookForm.get('departureDate')?.setValue('')
  }

  private updateAttendeesFormArray(numberOfAttendees: number) {
    while (this.attendeesFormArray.length < numberOfAttendees) {
      this.attendeesFormArray.push(this.createAttendeeFormGroup());
    }
    while (this.attendeesFormArray.length > numberOfAttendees) {
      this.attendeesFormArray.removeAt(this.attendeesFormArray.length - 1);
    }
  }

  private createAttendeeFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  public onContactSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }

  public onBookSubmit(): void {
    if (this.bookForm.valid) {
      console.log(this.bookForm.value);
    }
  }
}

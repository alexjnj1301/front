import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  @Input() public translateValues: any

  public contactForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.minLength(10)],
      message: ['', Validators.minLength(10)]
    });
  }

  public onContactSubmit(): void {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }
}

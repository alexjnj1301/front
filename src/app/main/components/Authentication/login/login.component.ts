import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MultipleTransLoaderHttp } from '../../../../MultipleTransLoaderHttp'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public isLoading = false
  public loginForm: FormGroup
  translateValues: any = {}

  constructor(private formBuilder: FormBuilder,
              private translateService: MultipleTransLoaderHttp) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.translateService.getTranslation().subscribe((result) => {
      this.translateValues = result.login;
    });
  }
}

import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MultipleTransLoaderHttp } from '../../../../MultipleTransLoaderHttp'
import { AuthenticationService } from '../../../services/authentication.service'
import { AppComponent } from '../../../../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../authentication.styles.scss'
})
export class LoginComponent implements OnInit {
  public isLoading = false
  public loginForm: FormGroup
  translateValues: any = {}

  constructor(private formBuilder: FormBuilder,
              private translateService: MultipleTransLoaderHttp,
              private authenticationService: AuthenticationService,
              private appComponent: AppComponent) {
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

  public login(): void {
   this.appComponent.setIsLoading(true)
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response)
        this.appComponent.setIsLoading(false)
      },
      error: (err) => {
        console.log('Error:', err)
        this.appComponent.setIsLoading(false)
      }
    })
  }
}

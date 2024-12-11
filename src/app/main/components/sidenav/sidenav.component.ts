import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { SidenavService } from '../../services/sidenav.service'
import { MultipleTransLoaderHttp } from '../../../MultipleTransLoaderHttp'
import { AuthenticationService } from '../../services/authentication.service'
import { CurrentUser } from '../../../models/CurrentUser'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer') public drawer!: MatDrawer
  public translateValues: any = {}
  public currentUser: CurrentUser | null = null
  public test: string = ''

  constructor(protected sideNavService: SidenavService,
              protected authService: AuthenticationService,
              private translateService: MultipleTransLoaderHttp) {
  }

  public ngOnInit(): void {
    this.translateService.getTranslation().subscribe((result) => {
      this.translateValues = result.sidenav
      this.test = this.translateValues.welcomeUser
      console.log("test", this.test)
    })
    this.sideNavService.toggleSidenav$.subscribe(() => {
      this.toggleSideNav()
    })
  }

  public toggleSideNav(): void {
    this.drawer.toggle()
  }

  public isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  public logout(): void {
    this.authService.logout()
  }
}

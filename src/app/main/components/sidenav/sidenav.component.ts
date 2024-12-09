import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { SidenavService } from '../../services/sidenav.service'
import { MultipleTransLoaderHttp } from '../../../MultipleTransLoaderHttp'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer') public drawer!: MatDrawer
  public translateValues: any = {}

  constructor(protected sideNavService: SidenavService,
              private authService: AuthenticationService,
              private translateService: MultipleTransLoaderHttp) {
  }

  public ngOnInit(): void {
    this.translateService.getTranslation().subscribe((result) => {
      this.translateValues = result.sidenav
    })
    this.sideNavService.toggleSidenav$.subscribe(() => {
      this.toggleSideNav()
    })
  }

  public toggleSideNav(): void {
    this.drawer.toggle()
  }

  public logout(): void {
    this.authService.logout()
  }
}

import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private toggleSidenavSubject = new Subject<void>()
  private isSidenavOpen: boolean

  public toggleSidenav$ = this.toggleSidenavSubject.asObservable()

  public constructor(private router: Router) {
    this.isSidenavOpen = this.hasToBeOpened()
  }

  public toggleSidenav(): void {
    this.toggleSidenavSubject.next()
    this.isSidenavOpen = !this.isSidenavOpen
  }

  public isSidenavOpened(): boolean {
    return this.isSidenavOpen
  }

  public isActiveRouteAuthentication(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }

  public hasToBeOpened(): boolean {
    return !this.isActiveRouteAuthentication()
  }
}

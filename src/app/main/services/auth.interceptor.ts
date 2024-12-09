import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')

    if (req.url.startsWith('http://127.0.0.1:8080/api')) {
      const clonedRequest = token
        ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          }
        }) : req

      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['/error/' + error.status])
          }
          return throwError(() => error)
        })
      )
    }

    return next.handle(req)
  }
}

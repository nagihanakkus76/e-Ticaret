import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Error } from '../services/error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const error = inject(Error);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      error.handle(err);
      return of();
    })
  );
};

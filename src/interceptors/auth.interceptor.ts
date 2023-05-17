import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, switchMap, EMPTY } from 'rxjs';
import { SpotifyAuth } from 'src/services/spotify/spotify-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private spotifyAuth: SpotifyAuth) {}

  private isRefreshing = false;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('api/token') &&
          error.status === 401
        ) {
          return this.tryRefreshingToken(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private tryRefreshingToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      const refreshToken = localStorage.getItem('refresh_token');
      const accessToken = localStorage.getItem('refresh_token');

      if (accessToken && refreshToken) {
        return this.spotifyAuth.refresh(refreshToken).pipe(
          switchMap((refreshResponse) => {
            this.isRefreshing = false;

            localStorage.setItem('access_token', refreshResponse.access_token);
            localStorage.setItem(
              'refresh_token',
              refreshResponse.refresh_token
            );

            request.headers.set(
              'Authorization',
              `Bearer ${refreshResponse.access_token}`
            );

            console.log('refresh token response: ', refreshResponse);

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '400') {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              window.location.href = '';
            }

            return throwError(() => error);
          })
        );
      }

      request.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('access_token')}`
      );
      return next.handle(request);
    }

    return EMPTY;
  }
}

import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('kms: ' + next);
        return next.handle(request).pipe(catchError(err => {
            // let error;
            // if(err.error && err.error.msg) error = err.error.msg;
            // else error = err.statusText;
            // console.log("WTF Error; " + error);
            return throwError(err);
        }));
    }
}

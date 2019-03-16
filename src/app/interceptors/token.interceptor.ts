import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigStorageService} from "../providers/config-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private configStorageService: ConfigStorageService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.configStorageService.config && this.configStorageService.config.apiToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.configStorageService.config.apiToken}`
                }
            });
        }

        return next.handle(request);
    }
}

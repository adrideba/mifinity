import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedreq = req.clone({
            headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        });

        return next.handle(clonedreq);
    }
}


import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "src/app/core/services/user.service";

import { environment } from '../../../environments/environment';
const apiUrl = environment.apiURL;

@Injectable()
export class errorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let reqStream$ = next.handle(req);

        return reqStream$.pipe(
            catchError((err) => {
                this.router.navigate(['/error'], { queryParams: { error: 'some text' } });//err.message } });
                return throwError(() => new Error(err));
               //throw err;
            })
        );
    }

}

export const errorInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: errorInterceptor,
    multi: true
};
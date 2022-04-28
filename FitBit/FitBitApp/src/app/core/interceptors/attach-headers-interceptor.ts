import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "src/app/user/user.service";

import { environment } from '../../../environments/environment';
const apiUrl = environment.apiURL;

@Injectable()
export class attachHeadersInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let reqStream$ = next.handle(req);
        let token = localStorage.getItem('token')!;

        if (['/profile', '/delete', '/logout', '/edit', '/myCourses'].some(function (v) { return req.url.indexOf(v) >= 0; })) {
            reqStream$ = next.handle(req.clone({
                url: req.url,
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`,
                    'uid': this.userService.user?.userId!
                })
            }));
        } else {
            reqStream$ = next.handle(req.clone({
                url: req.url,
            }));
        }

        return reqStream$.pipe(
            catchError((err) => {
                this.router.navigate(['/error'], { queryParams: { error:  err.message } });// err.message } });
                return throwError(() => new Error(err));
            })
        );
    }

}

export const headersInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: attachHeadersInterceptor,
    multi: true
};
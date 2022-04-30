import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserService } from "src/app/user/user.service";

import { environment } from '../../../environments/environment';
const apiUrl = environment.apiURL;

@Injectable()
export class attachHeadersInterceptor implements HttpInterceptor {

    constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token')!;
        
        if (['/profile', '/delete', '/logout', '/edit', '/myCourses'].some(function (v) { return req.url.indexOf(v) >= 0; })) {
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                    'uid': this.userService.user?.userId!
                }
            });
        }
        
        let reqStream$ = next.handle(req);
        return reqStream$.pipe(
            catchError((err) => {
                this.router.navigate(['/error']);
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
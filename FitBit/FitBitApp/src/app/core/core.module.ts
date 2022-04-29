import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalStorage } from './injection-tokens';
import { AuthActivate } from './guard/auth.activate';
import { HttpClientModule } from '@angular/common/http';
import { headersInterceptorProvider } from './interceptors/attach-headers-interceptor';
import { errorInterceptorProvider } from './interceptors/error-interceptor';
import { globalErrorHandlerProvider } from './error-handler';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  providers: [{
    provide: LocalStorage,
    useFactory: (platformId: Object) => {

      if (isPlatformBrowser(platformId)) {
        return window.localStorage;
      }
      if (isPlatformServer(platformId)) {
        return class implements Storage {
          length = 0;
          private data: Record<string, string> = {};

          clear(): void {
            this.data = {};
          }

          getItem(key: string): string | null {
            return this.data[key];
          }

          key(index: number): string | null {
            throw new Error('Method not implemented.');
          }

          removeItem(key: string): void {
            const { [key]: removedItem, ...others } = this.data;
            this.data = others;
          }

          setItem(key: string, value: string): void {
            this.data[key] = value;
          }
        }
      }
      throw Error('NOT IMPLEMENTED');
    },
    deps: [PLATFORM_ID]
  },
    AuthActivate,
   // headersInterceptorProvider,
   // globalErrorHandlerProvider,
   UserService
  ]
})
export class CoreModule { }

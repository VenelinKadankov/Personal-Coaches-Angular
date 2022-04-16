import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../userService';
import { sameValueAsFactory } from 'src/app/shared/validators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  killSubscription = new Subject();
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { 
      this.registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        tel: [''],
        password: ['', [Validators.required, Validators.minLength(4)]],
        rePassword: ['', [Validators.required, sameValueAsFactory(
          () => this.registerForm?.get('password'), this.killSubscription
        )]]
      });
    }

    register(): void {
      if (this.registerForm.invalid) { return; }
      
      let name = this.registerForm.value.name;
      let email = this.registerForm.value.email;
      let tel = this.registerForm.value.tel;
      let password = this.registerForm.value.password;

      this.userService.register(name, email, tel, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }

  ngOnDestroy(): void {
    this.killSubscription.next(void 0);
    this.killSubscription.complete();
  }
}

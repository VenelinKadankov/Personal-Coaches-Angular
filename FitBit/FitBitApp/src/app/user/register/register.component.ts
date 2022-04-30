import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { sameValueAsFactory, urlValidator } from 'src/app/shared/validators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy, OnInit {
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
        profileImg: ['', [urlValidator]],
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
      let profileImg = this.registerForm.value.profileImg;

      this.userService.register(name, email, tel, profileImg, password).subscribe({
        next: (res) => {
          this.userService.login(email, password).subscribe();
          this.router.navigate(['/']);
        },
        error: (err) => {
          window.alert('The data you have provided is unsufficient or the email is already in use!')
        }
      })
    }
    
    ngOnInit(): void {
      if(this.userService.GetToken()){
        this.router.navigate(['/'])
      }
    }

  ngOnDestroy(): void {
    this.killSubscription.next(void 0);
    this.killSubscription.complete();
  }
}

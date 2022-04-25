import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
    ) { 
      this.loginForm= this.fb.group({
        email: ['', [Validators.required]],
        password: ['',[Validators.required]]
      })
    }

    login(): void{
      if(this.loginForm.invalid){ return; }

      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;

      this.userService.login(email, password).subscribe({
        next: () => {
          const redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl'] || '/';
          this.router.navigate([redirectUrl]);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
}

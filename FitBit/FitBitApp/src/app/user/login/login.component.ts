import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

    ngOnInit(): void {
      if(this.userService.GetToken()){
        this.router.navigate(['/'])
      }
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
          window.alert('You have not filled correctly all data!');
         // this.router.navigate(['/login', { 'status': err.status }]);
        }
      })
    }
}

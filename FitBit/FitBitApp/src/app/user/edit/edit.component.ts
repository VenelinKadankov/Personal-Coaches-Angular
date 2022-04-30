import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { IUser } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements  OnInit {
  editForm: FormGroup;
  user: IUser | undefined | null;

  get userId(): string {
    return this.userService.user?.userId!;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { 
      this.editForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        tel: [''],
        profileImg: ['']
      });
    }

    edit(): void {
      if (this.editForm.invalid) { return; }
      
      let name = this.editForm.value.name;
      let email = this.editForm.value.email;
      let tel = this.editForm.value.tel;
      let profileImg = this.editForm.value.profileImg;

      this.userService.update(name, email, tel, profileImg).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.router.navigate(['**', { 'status': err.status}]);
        }
      })
    }

    ngOnInit(): void {
      this.user = this.userService.user;

      this.editForm.patchValue({'name': this.user?.name, 'email': this.user?.email, 'tel': this.user?.tel, 'profileImg': this.user?.profileImg })
    }
}

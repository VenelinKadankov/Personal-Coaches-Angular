import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { CourseService } from '../course.service';
import { urlValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  createForm: FormGroup;
  courseImgs: string[] | undefined | null;
  validUrl: boolean = true;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private userService: UserService
  ) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      images: [''],
      newImg: ['', [urlValidator]]
    });
    this.courseImgs = [];
  }

  ngOnInit(): void {
    let user = this.userService.user;
    if (!user) {
      this.router.navigate(['/login']);
    } else if (user && user.role != 'Coach' && user.role != 'Admin') {
      this.router.navigate(['/']);
    }
  }

  create(): void {
    if (this.createForm.invalid) { 
      window.alert('Invalid data!');
      return; 
    }

    let title = this.createForm.value.title;
    let content = this.createForm.value.content;

    this.courseService.createCourse(title, content, this.courseImgs!, []).subscribe({
      next: () => {
        this.router.navigate(['/all-courses']);
      },
      error: (err) => {
        this.router.navigate(['**', { 'status': err.status }]);
      }
    });
  }

  addImg(): void {
    let newImg = this.createForm.value.newImg;

    if(!this.checkValidUrl(newImg)){
      this.validUrl = false;
      return;
    }

    if (newImg) {
      this.courseImgs?.push(newImg);
      this.createForm.patchValue({ 'newImg': '' })
      this.validUrl = true;
    }
  }

  includeExcludeImg(image: string, event: any) {
    if (event.currentTarget.checked) {
      this.courseImgs?.push(image)
    } else {
      this.courseImgs?.splice(this.courseImgs?.indexOf(image), 1);
    }
  }

  private checkValidUrl(text: string): boolean{
    let url;
  
    try {
      url = new URL(text);
    } catch (_) {
      return false;  
    }
  
    return true;
  }
}

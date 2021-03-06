import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/Interfaces/course';
import { urlValidator } from 'src/app/shared/validators';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  courseId: string | undefined | null;

  editForm: FormGroup;
  course: ICourse | undefined | null;
  courseImgs: string[] | undefined | null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      images: [''],
      newImg: ['', [urlValidator]]
    });
  }

  edit(): void {
    if (this.editForm.invalid) { 
      window.alert('Invalid data!');
      return; }

    let title = this.editForm.value.title;
    let content = this.editForm.value.content;

    this.courseService.update(this.courseId!, title, content, this.courseImgs!, this.course?.subscribers!).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.router.navigate(['**', { 'status': err.status }]);
      }
    });
  }

  includeExcludeImg(img: string, event: any) {
    if (event.checked) {
      this.courseImgs?.push(img)
    } else {
      this.courseImgs?.splice(this.courseImgs?.indexOf(img), 1);
    }
  }

  addImg() {
    let newImg = this.editForm.value.newImg;

    if (newImg) {
      this.courseImgs?.push(newImg);
      this.editForm.patchValue({ 'newImg': '' })
    }
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;

    this.courseService.getSingleCourse(this.courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.courseImgs = course.images;
        this.editForm.patchValue({ 'title': this.course?.title, 'content': this.course?.content, 'images': this.course?.images })
      },
      error: (err) => this.router.navigate(['**', { 'status': err.status }])
    });
  }

}

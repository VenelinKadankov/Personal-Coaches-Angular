import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/Interfaces/course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  courseId: string | undefined | null;
  // @Input() courseParam: ICourse | undefined | null;

  editForm: FormGroup;
  course: ICourse | undefined | null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      images: ['']
    });
   }

   edit(): void {
    if (this.editForm.invalid) { return; }
    
    let title = this.editForm.value.title;
    let content = this.editForm.value.content;
    let images = this.editForm.value.images;

    this.courseService.update(title, content, images, this.course?.subscribers!).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.router.navigate(['**', { 'status': err.status}]);
      }
    })
  }

  ngOnInit(): void { 
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    
    this.courseService.getSingleCourse(this.courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.editForm.patchValue({'title': this.course?.title, 'content': this.course?.content, 'images': this.course?.images })
      },
      error: (err) => console.log(err)
    });
    
     //this.course = this.courseService.course;


  
  }

}

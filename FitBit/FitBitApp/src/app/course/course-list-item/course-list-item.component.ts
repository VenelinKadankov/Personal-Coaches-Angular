import { Component, Input, OnInit } from '@angular/core';

import { ICourse } from 'src/app/Interfaces/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {

  @Input() course: ICourse | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

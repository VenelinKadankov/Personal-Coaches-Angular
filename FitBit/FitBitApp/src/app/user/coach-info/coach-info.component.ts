import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-coach-info',
  templateUrl: './coach-info.component.html',
  styleUrls: ['./coach-info.component.css']
})
export class CoachInfoComponent implements OnInit {

  @Input() coach: IUser | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

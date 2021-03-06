import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FitBitApp';

  constructor(private userService: UserService){}

  ngOnInit(): void {
    let token = localStorage.getItem('token');

    if(token){
      this.userService.getUser().subscribe({
        error: () => {}
      });
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  @Input() status: string | undefined;

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = this.route.snapshot.paramMap.get('status')!;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1: number = 10;
  progress2: number = 20;

  constructor() { }

  ngOnInit() {
  }

}

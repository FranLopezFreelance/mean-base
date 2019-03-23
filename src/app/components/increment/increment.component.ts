import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.css']
})
export class IncrementComponent implements OnInit {

  @ViewChild('inputProgress') inputProgress: ElementRef;

  @Input() legend: string = 'Constructor';
  @Input() progress: number = 0;

  @Output() changes: EventEmitter<number> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {

  }

  catchChange( newValue: number) {


    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.inputProgress.nativeElement.value = this.progress;

    this.changes.emit(this.progress);
  }

  changeValue(value) {
    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;

    this.changes.emit(this.progress);

    this.inputProgress.nativeElement.focus();
  }

}

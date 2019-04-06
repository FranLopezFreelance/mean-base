import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-pnf',
  templateUrl: './pnf.component.html',
  styles: []
})
export class PnfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}

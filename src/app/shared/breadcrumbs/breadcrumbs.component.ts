import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titleBC: string;

  constructor( private router: Router,
               private title: Title,
               private meta: Meta ) {
    this.getDataRoute()
    .subscribe( data => {
      this.titleBC = data.title;
      this.title.setTitle(data.title);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: data.title
      };

      this.meta.updateTag(metaTag);
    });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data)
    );
  }

}

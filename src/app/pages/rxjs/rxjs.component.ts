import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subsciption: Subscription;

  constructor() {
    this.subsciption = this.returnObserver()
    .subscribe(
      number => console.log(number),
      error => console.error('Error: ', error),
      () => console.log('El Observador Terminó')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Saliste de rxjs, se cancela la suscripción');
    this.subsciption.unsubscribe();
  }

  returnObserver(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let counter = 0;

      const interval = setInterval( () => {
        counter += 1;

        const exit = {
          value: counter
        };

        observer.next( exit );

        // if ( counter === 3 ) {
        //   clearInterval( interval );
        //   observer.complete();
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.value ),
      filter( ( value, index) => {
        if ( (value % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      } )
    );
  }

}

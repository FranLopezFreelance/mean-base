import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard'},
        { title: 'Barra de Progreso', url: '/progress'},
        { title: 'Gráficos', url: '/graph1'}
      ]
    }
  ];

  constructor() { }
}

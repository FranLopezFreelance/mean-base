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
        { title: 'Barras de Progreso', url: '/progress'},
        { title: 'Gráficos', url: '/graph1'},
        { title: 'Promesas', url: '/promises'},
        { title: 'RxJs', url: '/rxjs'}
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: '/users'},
        { title: 'Hospitales', url: '/hospitals'},
        { title: 'Médicos', url: '/doctors'}
      ]
    }
  ];

  constructor() { }
}

import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PromisesComponent } from './promises/promises.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'}},
            { path: 'progress', component: ProgressComponent, data: { title: 'Baras de Progreso'}},
            { path: 'graph1', component: Graph1Component, data: { title: 'Gráficos'}},
            { path: 'promises', component: PromisesComponent, data: { title: 'Promesas'}},
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs'}},
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes'}},
            { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de Usuario'}},
            { path: 'users', component: UsersComponent, data: { title: 'Mantenimiento de Usuarios'}},
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

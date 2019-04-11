import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

// Guards
import { LoginGuard, AdminGuard } from '../services/service.index';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PromisesComponent } from './promises/promises.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            // Sections
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'}},
            { path: 'progress', component: ProgressComponent, data: { title: 'Baras de Progreso'}},
            { path: 'graph1', component: Graph1Component, data: { title: 'Gráficos'}},
            { path: 'promises', component: PromisesComponent, data: { title: 'Promesas'}},
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs'}},
            { path: 'search/:text', component: SearchComponent, data: { title: 'Búsqueda'}},
            // Profile
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes'}},
            { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de Usuario'}},
            // Maintenance
            // Guards
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [ AdminGuard ],
                data: { title: 'Mantenimiento de Usuarios'}
            },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales'}},
            { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento de Médicos'}},
            { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Médico'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

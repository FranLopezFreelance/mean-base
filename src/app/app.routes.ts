import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graph1Component } from './pages/graph1/graph1.component';
import { PnfComponent } from './shared/pnf/pnf.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent},
            { path: 'progress', component: ProgressComponent},
            { path: 'graph1', component: Graph1Component},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: PnfComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true } );
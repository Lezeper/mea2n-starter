import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { ADMIN_ROUTES } from './admin/admin.routing';
import { CanActivateTeam } from './service/active.service'; 

const APP_ROUTES: Routes = [
    { path: 'home',  component: HomeComponent},
    { path: 'admin', component: AdminComponent,
        children: ADMIN_ROUTES, canActivate: [CanActivateTeam] },
    { path: 'login', component: AuthComponent },
    { path: '**', redirectTo: '/home' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
import { Routes } from '@angular/router';

import { OverviewsComponent } from './overviews/overviews.component';
import { LogComponent } from './log/log.component';
import { MgComponent } from './mg/mg.component';
import { ModulesComponent } from './modules/modules.component';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';

export const ADMIN_ROUTES: Routes = [
    { path: 'overviews', component: OverviewsComponent },
    { path: 'log', component:  LogComponent },
    { path:  'mg', component: MgComponent },
    { path: 'modules', component: ModulesComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'users', component: UsersComponent },
    { path: '**', redirectTo: '/admin/overviews' }
];
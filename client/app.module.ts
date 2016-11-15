import { NgModule, ValueProvider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AdminComponent } from './admin/admin.component';
import { OverviewsComponent } from './admin/overviews/overviews.component'; 
import { LogComponent } from './admin/log/log.component';
import { MgComponent } from './admin/mg/mg.component';
import { ModulesComponent } from './admin/modules/modules.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { UsersComponent } from './admin/users/users.component';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AuthComponent } from './auth/auth.component';

import { CanActivateTeam } from './service/active.service';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';

const WINDOW_PROVIDER: ValueProvider = {
    provide: Window,
    useValue: window
};

@NgModule({
    declarations: [
        AppComponent, HomeComponent, AdminComponent,
        NavComponent, FooterComponent, AuthComponent,
        OverviewsComponent, LogComponent, MgComponent,
        ModulesComponent, SettingsComponent, UsersComponent
    ],
    imports: [BrowserModule, routing, HttpModule, ReactiveFormsModule],
    bootstrap: [AppComponent],
    providers: [WINDOW_PROVIDER, CanActivateTeam, AuthService,
                DataService]
})
export class AppModule {

}
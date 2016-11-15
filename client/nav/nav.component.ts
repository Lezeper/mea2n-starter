import { Component } from '@angular/core';

import { AuthService } from '../service/auth.service';
import { User } from '../model/user.model';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.view.html'
})
export class NavComponent {
    private window: Window;
    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout();
        window.location.href = "/";
    }

    currentUser: Object = this.authService.currentUser();
    isLoggedIn: boolean = this.authService.isLoggedIn();
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.view.html'
})
export class AuthComponent implements OnInit{
    constructor(private authService: AuthService, 
                private dataService: DataService) {}
    
    registerForm: FormGroup;
    loginForm: FormGroup;
    error: Boolean = false;

    onLogin() {
        const user = new User(this.loginForm.value.email,
            null, this.loginForm.value.password);
        
        this.authService.login(user).subscribe(
            data => window.location.href = "/",
            err => this.error = true
        );
    }

    onCreate() {
        const user = new User(this.registerForm.value.email,
            this.registerForm.value.name, this.registerForm.value.password);
        
        this.dataService.createUser(user).subscribe(
            data => alert(data.message),
            err => console.log(err)
        );
        // this.registerForm.reset();
        window.location.href = "/";
    }

    ngOnInit() {
        this.registerForm = new FormGroup({
            email: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });

        this.loginForm = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }
}
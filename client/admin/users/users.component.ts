import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../service/data.service'; 

@Component({
    templateUrl: 'users.view.html'
})
export class UsersComponent implements OnInit{
    users: Object[];

    constructor(private dataService: DataService,
                private router: Router) {}

    deleteUser(id: any) {
        this.dataService.deleteUser(id).subscribe(
            data => {
                this.dataService.getAllUsers().subscribe(
                    data => this.users = data
                );
            },
            err => console.log(err)
        );
    }

    ngOnInit() {
        this.dataService.getAllUsers().subscribe(
            data => this.users = data
        );
    }
}
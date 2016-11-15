import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { Log } from './log.model';
import { DataService } from '../../service/data.service';

@Component({
    templateUrl: 'log.view.html'
})
export class LogComponent implements OnInit{
    logs: Log[];

    constructor(private _router: Router, 
                private dataService: DataService) {}

    deleteAllLogs() {
        this.dataService.deleteAllLogs().subscribe(
            data => {
                this.dataService.getAllLogs().subscribe(
                    (logs: Log[]) => { this.logs = logs }
                );
            },
            err => console.log(err)
        );
    }

    ngOnInit() {
        this.dataService.getAllLogs().subscribe(
            (logs: Log[]) => { this.logs = logs }
        );
    }
}
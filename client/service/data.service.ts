import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { User } from '../model/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class DataService {
    serverUrl: String = "/api";
    auth = new Headers({
          'Authorization': 'Bearer ' + this.authentication.getToken()
    });

    constructor(private http: Http, private authentication:AuthService) {}

    getAllUsers() {
        return this.http.get(this.serverUrl + '/user').map((res: Response) => {
            return res.json();
        }).catch((err: Response) => Observable.throw(console.log(err)));
    }

    createUser(user: User) {
        return this.http.post(this.serverUrl + '/user', user)
            .map((res: Response) => { return res.json() })
            .catch((err: Response) => Observable.throw(err.json()));
    }

    deleteUser(id: any) {
        return this.http.delete(this.serverUrl + '/user?id=' + id,
        {headers: this.auth}).map((res: Response) => {
                return res.json();
        }).catch((err: Response) => Observable.throw(err.json()));
    }

    getAllLogs() {
        return this.http.get(this.serverUrl + '/log', {headers: this.auth})
        .map((res: Response) => {
            return res.json()
        }).catch((err: Response) => Observable.throw(console.log(err)));
    }

    deleteAllLogs() {
        return this.http.delete(this.serverUrl + '/log', {headers: this.auth})
        .map((res: Response) => {
            return res.json();
        }).catch((err: Response) => Observable.throw(err.json()));
    }
}
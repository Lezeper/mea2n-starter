import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { User } from '../model/user.model';

@Injectable()
export class AuthService {
    serverUrl: String = "/api";
    window: Window;

    constructor(private http: Http) {}

    saveToken(token: String) {
        window.localStorage['mean-token'] = token;
    }

    getToken() {
        return window.localStorage['mean-token'];
    }

    isLoggedIn() {
        const token = this.getToken();
        var payload;
        if(token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        }else{
            return false;
        }
    }

    currentUser() {
      if(this.isLoggedIn()){
        const token = this.getToken();
        var payload = token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload);
        
        return {
          _id : payload._id,
          name: payload.name
        };
      }
    };

    login (user: User) {
      return this.http.post(this.serverUrl + '/login', user)
        .map((res: Response) => this.saveToken(res.json().token))
        .catch((err: Response) => Observable.throw(err.json()));
    };

    logout () {
      window.localStorage.removeItem('mean-token');
    };
}
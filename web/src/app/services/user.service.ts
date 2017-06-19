import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../models/index';

const userUserUrl = 'http://locahost:3000/users/';
 
@Injectable()
export class UserService {
    
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get(userUserUrl, this.jwt()).map((response: Response) => response.json());
    }
 
    getById(id: number) {
        return this.http.get(userUserUrl + id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post(userUserUrl, user, this.jwt()).map((response: Response) => response.json());
    }
 
    update(user: User) {
        return this.http.put(userUserUrl + user.id, user, this.jwt()).map((response: Response) => response.json());
    }
 
    delete(id: number) {
        return this.http.delete(userUserUrl + id, this.jwt()).map((response: Response) => response.json());
    }
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
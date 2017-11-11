import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NgForage} from 'ngforage';

@Injectable()
export class CoreService {
    public set username(value: string) {
        this.warehouse.setItem('username', value);
        this._username = value;
    }

    private readonly url: string = 'https://api.github.com';
    protected _username: string;

    constructor(protected http: HttpClient, protected warehouse: NgForage) {
    }

    protected get<T>(url): Observable<T> {
        return this.http.get<T>(this.url + url);
    }

    public async needUsername(): Promise<string> {
        const username: string = (await this.warehouse.getItem('username')) as string;

        if (username && username.length > 0) {
            this._username = username;
        }

        return username;
    }
}

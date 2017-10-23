import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Warehouse} from 'ngx-warehouse';

@Injectable()
export class CoreService {
  public set username(value: string) {
    console.log(value);
    this.warehouse.set('username', value);
    this._username = value;
    console.log(this._username);
  }

  private readonly url: string = 'https://api.github.com';
  protected _username: string;

  constructor(protected http: HttpClient, protected warehouse: Warehouse) {
  }

  protected get<T>(url): Observable<T> {
    return this.http.get<T>(this.url + url);
  }

  public needUsername(): Observable<string> {
    const promise: Promise<string> = new Promise((resolve) => {
      this.warehouse.get('username').subscribe((data) => {
        if (data && data.length > 0) {
          this._username = data;
          resolve(data);
        } else {
          resolve('');
        }
      });
    });

    return Observable.fromPromise(promise);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Warehouse} from 'ngx-warehouse';

@Injectable()
export class CoreService {
  private readonly url: string = 'https://api.github.com';

  constructor(protected http: HttpClient, protected warehouse: Warehouse) {
  }

  protected get<T>(url): Observable<T> {
    return this.http.get<T>(this.url + url);
  }

}

import {Injectable} from '@angular/core';
import {CoreService} from './core.service';
import {Observable} from 'rxjs/Observable';
import {Star} from '../shared/Star';
import {HttpClient} from '@angular/common/http';
import {Warehouse} from 'ngx-warehouse';

@Injectable()
export class GithubStarService extends CoreService {

  constructor(protected http: HttpClient, protected warehouse: Warehouse) {
    super(http, warehouse);
  }

  public getStars(username: string): Observable<Star[]> {
    /*this.warehouse.count().subscribe((n: number) => {
      return super.get(`/users/${username}/starred`) as Observable<Star[]>;
    }, (error) => {
      console.log(error);
    });*/
    return super.get(`/users/${username}/starred`) as Observable<Star[]>;
  }

}

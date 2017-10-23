import {Injectable} from '@angular/core';
import {CoreService} from './core.service';
import {Observable} from 'rxjs/Observable';
import {Star} from '../shared/Star';
import {HttpClient} from '@angular/common/http';
import {Warehouse} from 'ngx-warehouse';

@Injectable()
export class GithubStarService extends CoreService {
  private stars: Star[];

  constructor(protected http: HttpClient, protected warehouse: Warehouse) {
    super(http, warehouse);
  }

  public getStars(): Observable<Star[]> {
    const promise: Promise<Star[]> = new Promise((resolve) => {
      this.warehouse.get(`stars#${this._username}`).subscribe((stars: Star[]) => {
        if (!stars) {
          super.get(`/users/${this._username}/starred`).subscribe((data: Star[]) => {
            this.warehouse.set(`stars#${this._username}`, data);
            resolve(data);
          });
        } else {
          resolve(stars);
        }
      }, (error) => {
        console.log(error);
      });
    });
    promise.then((data) => this.stars = data);
    return Observable.fromPromise(promise);
  }

}

import {Injectable} from '@angular/core';
import {CoreService} from './core.service';
import {Observable} from 'rxjs/Observable';
import {Star} from '../shared/Star';
import {HttpClient} from '@angular/common/http';
import {Warehouse} from 'ngx-warehouse';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class GithubStarService extends CoreService {
  private starSubject: BehaviorSubject<Star[]> = new BehaviorSubject<Star[]>([]);
  public stars: Observable<Star[]>;
  private _stars: Star[];

  constructor(protected http: HttpClient, protected warehouse: Warehouse) {
    super(http, warehouse);
    this.stars = this.starSubject.asObservable();
    this.stars.subscribe((data: Star[]) => {
      this.warehouse.set(`stars#${this._username}`, data);
    });
  }

  public getStars(): void {
    this.warehouse.get(`stars#${this._username}`).subscribe((stars: Star[]) => {
      if (!stars) {
        super.get(`/users/${this._username}/starred`).subscribe((data: Star[]) => {
          this.warehouse.set(`stars#${this._username}`, data);
          this._stars = data;
          this.starSubject.next(this._stars);
        });
      } else {
        this._stars = stars;
        this.starSubject.next(this._stars);
      }
    }, (error) => {
      console.log(error);
    });
  }

  public favourite(star: Star) {
    const indx = this._stars.findIndex((val: Star) => val.full_name === star.full_name);
    this._stars[indx].favorite = !this._stars[indx].favorite;
    this.starSubject.next(this._stars);
  }
}

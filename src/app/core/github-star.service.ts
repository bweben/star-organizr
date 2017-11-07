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

    public getStars(username: string): Observable<Star[]> {
        const promise: Promise<Star[]> = new Promise((resolve, reject) => {
            this.warehouse.get(`stars#${username}`).subscribe((stars: Star[]) => {
                if (!stars) {
                    super.get(`/users/${username}/starred`).subscribe((data: Star[]) => {
                        this.warehouse.set(`stars#${username}`, data);
                        this._stars = data;
                        resolve(data);
                    });
                } else {
                    this._stars = stars;
                    resolve(stars);
                }
            }, (error) => {
                reject(error);
            });
        });

        return Observable.fromPromise(promise);
    }

    public favourite(star: Star) {
        const indx = this._stars.findIndex((val: Star) => val.full_name === star.full_name);
        this._stars[indx].favorite = !this._stars[indx].favorite;
        this.starSubject.next(this._stars);
    }
}

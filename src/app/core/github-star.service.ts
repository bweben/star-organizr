import {Injectable} from '@angular/core';
import {CoreService} from './core.service';
import {Observable} from 'rxjs/Observable';
import {Star} from '../shared/Star';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {NgForage} from 'ngforage';
import {reject} from 'q';

@Injectable()
export class GithubStarService extends CoreService {
    private starSubject: BehaviorSubject<Star[]> = new BehaviorSubject<Star[]>([]);
    public stars: Observable<Star[]>;
    private _stars: Star[];

    constructor(protected http: HttpClient, protected warehouse: NgForage) {
        super(http, warehouse);
        this.stars = this.starSubject.asObservable();
        this.stars.subscribe((data: Star[]) => {
            this.warehouse.setItem(`stars#${this._username}`, data);
        });
    }

    public getStars(username: string): Promise<Star[]> {
        const promise: Promise<Star[]> = new Promise((resolve, reject) => {
            this.getStarsInternal(username).then((data) => {
                if (!data || data.length <= 0) {
                    super.get(`/users/${username}/starred?page=1&per_page=100`).subscribe((stars$: Star[]) => { // max 100 per page
                        console.log(stars$);
                        this.warehouse.setItem(`stars#${username}`, stars$);
                        this._stars = stars$;
                        resolve(this._stars);
                    });
                } else {
                    this._stars = data;
                    resolve(this._stars);
                }
            });
        });
        return promise;
    }

    public async getStarsInternal(username: string): Promise<Star[]> {
        const stars = (await this.warehouse.getItem(`stars#${username}`)) as Star[];

        return stars;
    }

    public favourite(star: Star) {
        const indx = this._stars.findIndex((val: Star) => val.full_name === star.full_name);
        this._stars[indx].favorite = !this._stars[indx].favorite;
        this.starSubject.next(this._stars);
    }
}

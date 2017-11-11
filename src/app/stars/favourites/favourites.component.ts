import {Component, OnInit} from '@angular/core';
import {Star} from '../../shared/Star';
import {Store} from '@ngrx/store';
import {AppState, State} from '../../model';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
    public favorites: Star[] = [];

    constructor(private store: Store<State>) {
    }

    ngOnInit() {
        this.store.select('app').subscribe((data: AppState) => {
            if (data && data.stars) {
                this.favorites = data.stars.filter((star: Star) => star.favorite);
            }
        });
    }

}

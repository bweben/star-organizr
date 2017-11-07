import {Component, OnInit} from '@angular/core';
import {GithubStarService} from '../../core/github-star.service';
import {Star} from '../../shared/Star';
import {Store} from '@ngrx/store';
import {AppState} from '../../model';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
    public favorites: Star[];

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.select('stars').subscribe((data: Star[]) => {
            this.favorites = data.filter((star: Star) => star.favorite);
        });
    }

}

import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UsernameAskComponent} from './shared/username-ask/username-ask.component';
import {GithubStarService} from './core/github-star.service';
import {AppState} from './model';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(public dialog: MatDialog, private coreService: GithubStarService, private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.coreService.needUsername().then((data) => {
            if (!data) {
                const dialogRef = this.dialog.open(UsernameAskComponent, {
                    width: '250px',
                    data: {username: ''}
                });

                dialogRef.afterClosed().subscribe(result => {
                    this.coreService.username = result;
                    this.store.dispatch({
                        type: 'USERNAME_CHANGED',
                        payload: {name: result}
                    });
                });
            } else {
                this.coreService.username = data;
                this.store.dispatch({
                    type: 'USERNAME_CHANGED',
                    payload: {name: data}
                });
            }
        });
    }
}

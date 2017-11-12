import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State, Username} from '../../model';
import {CoreService} from '../../core/core.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public username = '';

    constructor(private store: Store<State>, private core: CoreService) {
    }

    ngOnInit() {
    }

    public load(): void {
        this.core.username = this.username;
        this.store.dispatch({
            type: 'USERNAME_CHANGED',
            payload: {
                name: this.username
            }
        });
    }

}

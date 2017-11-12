import {Folder} from './shared/folder';
import {Action, Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {GithubStarService} from './core/github-star.service';
import {of} from 'rxjs/observable/of';
import {FolderService} from './core/folder.service';
import {Observable} from 'rxjs/Observable';

export interface PayloadAction<T> extends Action {
    payload: T;
}

export interface Star {
    name: string;
    url: string;
    full_name: string;
    description: string;
    html_url: string;
    favorite: boolean;
}

export {Folder};

export interface AppState {
    username: string;
    stars: Star[];
    folders: { [id: number]: Folder };
}

export interface State {
    app: AppState;
}

export const initialState: State = {
    app: {
        username: '',
        stars: [],
        folders: {}
    }
};

export function appReducer(state: AppState, action: PayloadAction<any>): AppState {
    switch (action.type) {
        case 'USERNAME_CHANGED': {
            const username = {username: action.payload.name};
            return {...state, ...username};
        }
        case 'STARS_UPDATED': {
            return {...state, ...action.payload};
        }
        case 'FOLDERS_UPDATED': {
            return {...state, ...action.payload};
        }
        case 'FAVORISE_STAR': {
            const stars = state.stars;
            stars.find((star: Star) => star.full_name === action.payload.full_name).favorite = true;
            return {...state, stars};
        }
        case 'UNFAVORISE_STAR': {
            const stars = state.stars;
            stars.find((star: Star) => star.full_name === action.payload.full_name).favorite = false;
            return {...state, stars};
        }
        case 'ADD_TO_FOLDER': {
            const folders = {...state.folders};
            folders[action.payload._id].stars.push(action.payload.full_name);
            return {...state, folders};
        }
        case 'REMOVE_FROM_FOLDER': {
            const folders = {...state.folders};
            folders[action.payload._id].stars
                .splice(folders[action.payload._id].stars
                    .findIndex((full_name: string) => full_name === action.payload.full_name), 1);
            return {...state, folders};
        }
        case 'CREATE_FOLDER': {
            const folders = {...state.folders};
            folders[action.payload._id] = action.payload.folder;
            return {...state, folders};
        }
        case 'REMOVE_FOLDER': {
            const folders = {...state.folders};
            delete folders[action.payload._id];
            return {...state, folders};
        }
        default: {
            return state;
        }
    }
}

export interface Username {
    type: 'USERNAME_CHANGED' | 'UPDATE_STARS' | 'UPDATE_FOLDERS';
    payload: { name: string };
}

@Injectable()
export class UsernameEffects {
    @Effect() loadStars = this.actions.ofType('USERNAME_CHANGED')
        .flatMap((a: Username) => {
            return [
                {
                    type: 'UPDATE_STARS',
                    payload: a.payload
                },
                {
                    type: 'UPDATE_FOLDERS',
                    payload: a.payload
                }
            ];
        });

    @Effect() updateStars = this.actions.ofType('UPDATE_STARS')
        .switchMap((a: Username) => {
            return Observable.fromPromise(this.githubService.getStars(a.payload.name)).switchMap((stars: Star[]) => {
                return of({type: 'STARS_UPDATED', payload: {stars}});
            });
        });

    @Effect() updateFolders = this.actions.ofType('UPDATE_FOLDERS')
        .switchMap((a: Username) => {
            return Observable.fromPromise(this.folderService.getFolders(a.payload.name)).switchMap((folders: Folder[]) => {
                return of({type: 'FOLDERS_UPDATED', payload: {folders}});
            });
        });

    constructor(private actions: Actions,
                private store: Store<State>,
                private githubService: GithubStarService,
                private folderService: FolderService) {
    }
}

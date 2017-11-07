import {Injectable} from '@angular/core';
import {Warehouse} from 'ngx-warehouse';
import {HttpClient} from '@angular/common/http';
import {GithubStarService} from './github-star.service';
import {Star} from '../shared/Star';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Folder} from '../shared/folder';
import {reject} from 'q';

@Injectable()
export class FolderService extends GithubStarService {
  private _folders: Folder[] = [];
  private folderSubject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
  public folders: Observable<Folder[]>;

  public set username(value: string) {
    this.warehouse.set('username', value);
    this._username = value;
  }

  /*
  {
    id: '123' //???
    name: 'something',
    children: [
      {
        name: 'some child thingy'
      }
    ],
    stars: [
      'fullname/fullname'
    ]
  }
  */
  constructor(protected http: HttpClient, protected warehouse: Warehouse) {
    super(http, warehouse);
    console.log(this._username);
    this.folders = this.folderSubject.asObservable();
  }

  public getFolders(username: string): Observable<Folder[]> {
    const promise: Promise<Folder[]> = new Promise((resolve, reject) => {
        this.warehouse.get(`folders#${username}`).subscribe((folders: Folder[]) => {
            if (!folders) {
                folders = [new Folder('Folder')];
                this.warehouse.set(`folders#${username}`, folders);
            } else {
                this._folders = folders;
            }
            resolve(folders);
        });
    });
    return Observable.fromPromise(promise);
  }

}

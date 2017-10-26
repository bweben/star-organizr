import {Injectable} from '@angular/core';
import {Warehouse} from 'ngx-warehouse';
import {HttpClient} from '@angular/common/http';
import {GithubStarService} from './github-star.service';
import {Star} from '../shared/Star';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Folder} from '../shared/folder';

@Injectable()
export class FolderService extends GithubStarService {
  private _folders: Folder[] = [];
  private folderSubject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
  public folders: Observable<Folder[]>;

  public set username(value: string) {
    this.warehouse.set('username', value);
    this._username = value;
    this.getFolders();
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

  private getFolders(): void {
    this.warehouse.get(`folders#${this._username}`).subscribe((folders: Folder[]) => {
      if (!folders) {
        this.warehouse.set(`folders#${this._username}`, new Folder('Folder'));
      } else {
        this._folders = folders;
        this.folderSubject.next(this._folders);
      }
    });
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GithubStarService} from './github-star.service';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Folder} from '../shared/folder';
import {NgForage} from 'ngforage';

@Injectable()
export class FolderService extends GithubStarService {
    private _folders: Folder[] = [];
    private folderSubject: BehaviorSubject<Folder[]> = new BehaviorSubject<Folder[]>([]);
    public folders: Observable<Folder[]>;

    public set username(value: string) {
        this.warehouse.setItem('username', value);
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
    constructor(protected http: HttpClient, protected warehouse: NgForage) {
        super(http, warehouse);
        this.folders = this.folderSubject.asObservable();
    }

    async getFolders(username: string): Promise<Folder[]> {
        const folders = (await this.warehouse.getItem(`folders#${username}`)) as Folder[];

        if (!folders) {
            this._folders = [new Folder('Folder')];
            this.warehouse.setItem(`folders#${username}`, this._folders);
        } else {
            this._folders = folders;
        }

        return this._folders;
    }

}

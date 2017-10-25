import {Injectable} from '@angular/core';
import {Warehouse} from 'ngx-warehouse';
import {HttpClient} from '@angular/common/http';
import {GithubStarService} from './github-star.service';
import {Star} from '../shared/Star';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FolderService extends GithubStarService {
  private _folderStars: Star[] = [];
  private folderSubject: BehaviorSubject<Star[]> = new BehaviorSubject<Star[]>([]);
  public folderStars: Observable<Star[]>;

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
    this.folderStars = this.folderSubject.asObservable();
  }

}

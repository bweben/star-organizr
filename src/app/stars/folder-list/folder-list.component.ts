import {Component, OnInit} from '@angular/core';
import {GithubStarService} from '../../core/github-star.service';
import {Star} from '../../shared/Star';
import {FolderService} from '../../core/folder.service';
import {Folder} from '../../shared/folder';
import {Store} from '@ngrx/store';
import {AppState} from '../../model';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css']
})
export class FolderListComponent implements OnInit {
  public get nExpanded(): number {
    return this._nExpanded;
  }

  public set nExpanded(value: number) {
    this._nExpanded = value;
  }

  private _nExpanded = 0;
  public stars: Star[];
  public folders: Folder[];

  constructor(private store: Store<AppState>) {
  }

  public ngOnInit() {
    this.store.select('stars').subscribe((stars: Star[]) => {
      this.stars = stars.sort((star1: Star, star2: Star) => star1.full_name.localeCompare(star2.full_name));
    });

    this.store.select('folders').subscribe((folders: Folder[]) => {
      this.folders = folders;
    });
  }

  public setFavourite(star: Star): void {
    this.store.dispatch({
      type: 'FAVORISE_STAR',
      payload: {
        full_name: star.full_name
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {GithubStarService} from '../../core/github-star.service';
import {Star} from '../../shared/Star';
import {FolderService} from '../../core/folder.service';
import {Folder} from '../../shared/folder';

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

  constructor(private starService: GithubStarService,
              private folderService: FolderService) {
  }

  public ngOnInit() {
    this.starService.stars.subscribe((data: Star[]) => {
      this.stars = data.sort((star1: Star, star2: Star) => star1.full_name.localeCompare(star2.full_name));
    });

    this.folderService.folders.subscribe((data: Folder[]) => {
      this.folders = data;
    });
  }

  public setFavourite(star: Star): void {
    this.starService.favourite(star);
  }
}

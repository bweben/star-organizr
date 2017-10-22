import {Component, OnInit} from '@angular/core';
import {GithubStarService} from '../../core/github-star.service';
import {Star} from '../../shared/Star';

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

  constructor(private starService: GithubStarService) {
  }

  ngOnInit() {
    this.starService.getStars('bweben').subscribe((data: Star[]) => {
      this.stars = data.sort((star1: Star, star2: Star) => star1.full_name.localeCompare(star2.full_name));
      console.log(data);
    });
  }

}

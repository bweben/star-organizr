import { Component, OnInit } from '@angular/core';
import {GithubStarService} from '../../core/github-star.service';
import {Star} from '../../shared/Star';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  public stars: Star[];

  constructor(private starService: GithubStarService) { }

  ngOnInit() {
    this.starService.getStars('bweben').subscribe((data: Star[]) => {
      this.stars = data;
      console.log(data);
    });
  }

}

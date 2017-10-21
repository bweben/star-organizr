import { Component, OnInit } from '@angular/core';
import {GithubStarService} from '../../core/github-star.service';
import {Star} from '../../shared/Star';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  private favourites: Star[];

  constructor(private starService: GithubStarService) { }

  ngOnInit() {
    this.starService.getStars('bweben').subscribe((data: Star[]) => {
      this.favourites = data;
    });
  }

}

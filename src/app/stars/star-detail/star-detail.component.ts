import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../../shared/Star';

@Component({
  selector: 'app-star-detail',
  templateUrl: './star-detail.component.html',
  styleUrls: ['./star-detail.component.css']
})
export class StarDetailComponent implements OnInit {
  @Input() public star: Star;

  constructor() {
  }

  ngOnInit() {
  }

  public favorite(): void {
    if (!this.star) {
      return;
    }
    this.star.favorite = !this.star.favorite;
  }

}

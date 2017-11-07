import {Component, Input, OnInit} from '@angular/core';
import {Star} from '../../shared/Star';
import {Store} from '@ngrx/store';
import {AppState} from '../../model';

@Component({
  selector: 'app-star-detail',
  templateUrl: './star-detail.component.html',
  styleUrls: ['./star-detail.component.css']
})
export class StarDetailComponent implements OnInit {
  @Input() public star: Star;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  public favorite(): void {
    this.store.dispatch({
        type: this.star.favorite ? 'UNFAVORISE_STAR' : 'FAVORISE_STAR',
        payload: {
            full_name: this.star.full_name
        }
    });
  }

}

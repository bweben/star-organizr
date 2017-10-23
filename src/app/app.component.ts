import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {UsernameAskComponent} from './shared/username-ask/username-ask.component';
import {GithubStarService} from './core/github-star.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public username: string;

  constructor(public dialog: MatDialog, private coreService: GithubStarService) {
  }

  ngOnInit(): void {
    this.coreService.needUsername().subscribe((data) => {
      if (!data) {
        const dialogRef = this.dialog.open(UsernameAskComponent, {
          width: '250px',
          data: {username: ''}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.coreService.username = result;
          this.username = result;
        });
      } else {
        this.coreService.username = data;
        this.username = data;
      }
    });
  }
}

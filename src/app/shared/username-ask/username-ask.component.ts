import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-username-ask',
  templateUrl: './username-ask.component.html',
  styleUrls: ['./username-ask.component.css']
})
export class UsernameAskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UsernameAskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsernameAskComponent } from './username-ask/username-ask.component';
import {MatButtonModule, MatDialogModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [UsernameAskComponent],
  entryComponents: [UsernameAskComponent],
  exports: [UsernameAskComponent]
})
export class SharedModule { }

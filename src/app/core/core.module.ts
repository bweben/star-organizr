import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreService} from './core.service';
import {GithubStarService} from './github-star.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [CoreService, GithubStarService]
})
export class CoreModule { }

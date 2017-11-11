import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreService} from './core.service';
import {GithubStarService} from './github-star.service';
import {HttpClientModule} from '@angular/common/http';
import {FolderService} from './folder.service';
import {NgForageConfig, NgForageModule} from 'ngforage';
import {config} from './warehouse-config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgForageModule
  ],
  declarations: [],
  providers: [CoreService, GithubStarService, FolderService]
})
export class CoreModule {
  constructor(conf: NgForageConfig) {
    conf.configure(config);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreService} from './core.service';
import {GithubStarService} from './github-star.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxWarehouseModule} from 'ngx-warehouse';
import {config} from './warehouse-config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxWarehouseModule.configureWarehouse(config)
  ],
  declarations: [],
  providers: [CoreService, GithubStarService]
})
export class CoreModule { }

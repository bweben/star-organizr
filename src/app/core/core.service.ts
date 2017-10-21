import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CoreService {

  constructor(protected http: HttpClient) { }

}

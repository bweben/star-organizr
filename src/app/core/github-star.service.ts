import {Injectable} from '@angular/core';
import {CoreService} from './core.service';
import {Observable} from 'rxjs/Observable';
import {Star} from '../shared/Star';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GithubStarService extends CoreService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getStars(username: string): Observable<Star[]> {
    return this.http.get<Star[]>(`https://api.github.com/users/${username}/starred`);
  }

}

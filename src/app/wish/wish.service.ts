import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { Wish } from './wish';
import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export class WishService {

  newNewWish: Wish;

  private wishesUrl = 'http://localhost:8080/owish-rest/wish';

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticationService.getToken()
    });

  private headersString = new Headers({
      'Content-Type': 'text/plain',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
  });
  

  constructor(private http: Http,
    private authenticationService: AuthenticationService) {
    
  }

  getWishes(): Promise<Wish[]> {
    return this.http
     .get(this.wishesUrl, {headers: this.headers})
     .toPromise()
     .then(response => response.json() as Wish[])
     .catch(this.handleError);
    //  .then(response => response.json()._embedded.data as Wish[])
    //  .catch(this.handleError);

 }

 private handleError(error: any): Promise<any> {
   console.error('An error occurred: ', error); // for demo only
   return Promise.reject(error.message || error);
 }

  create(title: string): Promise<Wish> {
    const url = `${this.wishesUrl}/addwish`;

    return this.http
      .put(url, title, {headers: this.headersString})
      .toPromise()    
      .then(response => response.json() as Wish)
      .catch(this.handleError);
 }

 completeWish(wish: Wish): Promise<Wish>{
  const url = `${this.wishesUrl}/completewish`;
  return this.http
    .put(url, JSON.stringify(wish), {headers: this.headers})
    .toPromise()    
    //.then(() => wish)
    .then(response => response.json() as Wish)
    .catch(this.handleError);
 }
 
 uncompleteWish(wish: Wish): Promise<Wish>{
  const url = `${this.wishesUrl}/uncompletewish`;
  return this.http
    .put(url, JSON.stringify(wish), {headers: this.headers})
    .toPromise()
    //.then(() => wish)
    .then(response => response.json() as Wish)
    .catch(this.handleError);
 }

}

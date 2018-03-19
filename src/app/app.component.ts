import { Component } from '@angular/core';
import { Wish } from './wish/wish';
import { WishService } from './wish/wish.service';
import { NavbarService } from './navbar/navbar.service';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  // template : `
  //   <app-navbar></app-navbar>
  template : `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  providers: [WishService,NavbarService]
})
export class AppComponent {
  title = 'O\'Wish';


  constructor(private wishService : WishService){

  }

}

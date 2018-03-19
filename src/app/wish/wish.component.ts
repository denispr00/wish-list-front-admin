import { Component, OnInit } from '@angular/core';
import { Wish } from './wish';
import { WishService } from './wish.service';
import { NavbarService } from '../navbar/navbar.service';
import { NavbarComponent} from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { PagerService } from '../utils/pager.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  // template : `
  //   <app-navbar></app-navbar>
    
  //   <p>
  //     wish works! a
  //   </p>
  //   <button class="btn btn-primary" (click)="removeWish(wish)">TEST 2</button> 
  // `,
  styleUrls: ['./wish.component.css'],
  providers: [WishService,NavbarService,PagerService]
})
export class WishComponent implements OnInit {

  newWish: Wish = new Wish();

  // array of all items to be paged
  //wishList: Wish[] = [];
  wishList: Wish[];

  //ordered wish, not completed first
  orderedWishList: Wish[];
  openWishList: Wish[]=[];
  completedWishList: Wish[]=[];

  //public wishList;
  selectedWish: Wish;

  // pager object
  pager: any = {};
  
  // paged items
  pagedItems: any[];

  // input field
  inputWish:string;
  
  constructor(private wishService : WishService,public nav: NavbarService,private router:Router, 
    private pagerService:PagerService ){
  }

  ngOnInit() {
    this.nav.show();
    this.getWishes();
  }

  getWishes(): void {
    this.wishService.getWishes()
    .then(
      wishList => {
        this.wishList = wishList;
        // initialize to page 1
        this.orderWishList(wishList);
        this.setPage(1);
      },
      error => {
      this.router.navigate(['login']);
      console.error('An error occurred in wish component, navigating to login: ', error);
      }
    )
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.wishService.create(name)
    .then(
      wish => {
        this.inputWish = '';
        this.wishList.push(wish);
        this.orderWishList(this.wishList);
        this.setPage(1);
        } ,
      error => {
      this.router.navigate(['login']);
      console.error('An error occurred in wish component, navigating to login: ', error);
      }
    )
  }

  completeWish(wishToBeUpdated: Wish):void{
    this.wishService
    .completeWish(wishToBeUpdated)
    .then( updatedWish => {
        this.completeWishFront(wishToBeUpdated,updatedWish);
        //wishToBeUpdated = updatedWish;
        // this.wishList = this.wishList.filter(h => h !== wish);
        // if(this.selectedWish === wish) {
        //   this.selectedWish = null;
        // }
    });
  }

  uncompleteWish(wishToBeUpdated: Wish):void{
    this.wishService
    .uncompleteWish(wishToBeUpdated)
    .then( updatedWish => {
        this.uncompleteWishFront(wishToBeUpdated,updatedWish);
        //wishToBeUpdated = updatedWish;
        
        // this.wishList = this.wishList.filter(h => h !== wish);
        // if(this.selectedWish === wish) {
        //   this.selectedWish = null;
        // }
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.orderedWishList.length, page);

    // get current page of items
    this.pagedItems = this.orderedWishList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  orderWishList(wishList:Wish[]){
    this.completedWishList = [];
    this.openWishList = [];
    this.orderedWishList =[];
    for(let wish of  wishList){
      if (wish.completedDate != null){
        wish.complete  = true;
      } else{
        wish.complete  = false;
      }
      if(wish.complete){
        this.completedWishList.push(wish);
      }
      else{
        this.openWishList.push(wish);
      }
    }
    this.orderedWishList= this.openWishList.concat(this.completedWishList);
  }

  uncompleteWishFront(wishToBeUpdated,updatedWish){
    this.wishList.forEach( (item, index) => {
      if(item === wishToBeUpdated) {
        this.wishList[index].completedDate = null ;
        this.wishList[index].completedUser = null ;
      }
    });

    this.orderWishList(this.wishList);
    this.setPage(1);
  }

  completeWishFront(wishToBeUpdated,updatedWish){
    this.wishList.forEach( (item, index) => {
      if(item === wishToBeUpdated) {
        this.wishList[index].completedDate = updatedWish.completedDate ;
        this.wishList[index].completedUser = updatedWish.completedUser ;
      }
    });

    this.orderWishList(this.wishList);
    this.setPage(1);
  }
  
}


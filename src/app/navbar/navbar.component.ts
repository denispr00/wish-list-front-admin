import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent {

  constructor( public nav: NavbarService ) {}
}
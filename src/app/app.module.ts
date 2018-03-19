import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { NavbarComponent} from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { WishComponent} from './wish/wish.component';
import { AuthenticationService } from './login/authentication.service';
import { WishService } from './wish/wish.service';
import { CanActivateAuthGuard } from './login/can-activate.authguard';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    LoginComponent,
    WishComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [WishService,AuthenticationService,CanActivateAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

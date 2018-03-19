import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishComponent } from './wish/wish.component';
import { LoginComponent } from './login/login.component';
import { CanActivateAuthGuard } from './login/can-activate.authguard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'wish'  },
    { path: 'wish', component: WishComponent  },
    { path: 'login', component: LoginComponent  },
    { path: 'logout', component: LoginComponent  }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routingComponents = [WishComponent];
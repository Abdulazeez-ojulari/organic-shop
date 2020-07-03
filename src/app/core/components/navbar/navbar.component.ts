import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AngularFireObject } from '@angular/fire/database/database';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username;
  cart$: Observable<ShoppingCart>;
  appUser: AppUser;
  constructor(private auth: AuthService, private CartService: ShoppingCartService) {
     
    auth.appUser$.subscribe(appUser => 
      {this.appUser = appUser; 
        this.username = localStorage.getItem('username');
      });
   }

  logout(){
    localStorage.removeItem('username');
    this.username = '';
    this.auth.logout();
  }

  async ngOnInit(){
    this.cart$ = await this.CartService.getCart()
    
  }

}

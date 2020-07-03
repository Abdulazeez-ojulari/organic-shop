import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent{
  orders;
  constructor(private authService: AuthService, private orderService: OrderService) {
    authService.user$.pipe(
      switchMap(user => orderService.getOrderByUsers(user.uid).snapshotChanges()))
      .subscribe(x => {this.orders = x; console.log(this.orders)});
   }

  

}

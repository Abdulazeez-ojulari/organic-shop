import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {
  orders;

  constructor(private orderService: OrderService) { 
    orderService.getOrders().valueChanges().subscribe(
      x => { this.orders = x; console.log(this.orders.shippin.datePlaced)}
    );
  }


}

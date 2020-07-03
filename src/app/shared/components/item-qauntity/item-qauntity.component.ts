import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'item-quantity',
  templateUrl: './item-qauntity.component.html',
  styleUrls: ['./item-qauntity.component.css']
})
export class ItemQauntityComponent{
  @Input('item') item;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) { }

  addMoreCart(){
    this.cartService.addMoreCart(this.item);
  };

  removeLessCart(){
    this.cartService.removeLessCart(this.item);
  };

}

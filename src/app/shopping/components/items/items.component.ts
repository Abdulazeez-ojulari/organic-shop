import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { switchMap, take } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit{
  products= [];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {};

  ngOnInit(){
  this.cart$ =  this.shoppingCartService.getCart();
  this.items();
    
  };

  items(){
    return this.productService.getAll().pipe(
    switchMap(products => {
      this.products = products;
      return this.route.queryParamMap; }))
      .subscribe(params => {
        this.category = params.get('category');
  
        this.applyfilter();
      })
    };

    applyfilter(){
      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.data.category === this.category) : 
        this.products;
    }
  }
 

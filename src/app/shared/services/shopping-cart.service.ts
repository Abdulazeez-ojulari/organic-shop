import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

 getCart(): Observable<ShoppingCart>{
    let cartId = this.getorCreateCartId();
    return this.db.object('/shopping-carts/' + cartId +'/items')
    .snapshotChanges().pipe(map(x =>  new ShoppingCart(x.payload.exportVal())));
  }

  async addToCart(product){
    this.updateCart(product, 1);
  }

  async removeFromCart(product){
    this.updateCart(product, -1)
  }

  async addMoreCart(product){
    this.changeCart(product, 1);
  }

  async removeLessCart(product){
    this.changeCart(product, -1)
  }

  async clearCart(){
    let cartId = await this.getorCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private  getorCreateCartId(){
    let cartId = localStorage.getItem('cartId')
    if (!cartId){
      let result = this.create();
      localStorage.setItem('cartId', result.key);
      return result.key
    }else{
      return cartId

    }
  }

  private async updateCart(product, change:number){
    let cartId = await this.getorCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      // let quantity= item.payload.exportVal().quantity + change;
      // if (quantity === 0) item$.remove()
      // else{
        if (item.payload.exists()) item$.update({ 
          quantity: item.payload.exportVal().quantity + change});
        else item$.set({ 
          title: product.data.title,
          imageUrl: product.data.imageUrl,
          price: product.data.price,
          quantity:1 })
      
    })
  }

  private async changeCart(product, change:number){
    let cartId = await this.getorCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      let quantity= item.payload.exportVal().quantity + change;
      if (quantity === 0) item$.remove()
      else{
        if (item.payload.exists()) item$.update({ 
          quantity:item.payload.exportVal().quantity + change});
        else item$.update({ 
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity })
        
    }})
  }
}

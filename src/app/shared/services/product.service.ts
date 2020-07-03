import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public person$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.person$ = this.getAll();
   }

  create(product){
   return this.db.list('/products').push(product);
  }

  getAll(): Observable<any>{
    return this.db.list('/products').snapshotChanges()
    .pipe(
      map(actions => actions.map(action =>  {
        const $key = action.payload.key;
        const data = action.payload.val()
        return {$key, data};
      }))
    );
  }

  get(productId: string){
    return this.db.object('products/' + productId);
  }

  update(productId, product){
    return this.db.object('products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('products/' + productId).remove()
  }
}

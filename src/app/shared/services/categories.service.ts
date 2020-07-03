import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categories$: Observable<any>;

  constructor(private db: AngularFireDatabase) { 
    this.categories$= this.getCategories();
  }

  getCategories(): Observable<any>{
    return this.db.list('/categories').snapshotChanges()
    .pipe(
      map(actions => actions.map(action =>  {
        const key = action.payload.key;
        const data = action.payload.val();
        return {key, data}
      }))
    );
  }
}

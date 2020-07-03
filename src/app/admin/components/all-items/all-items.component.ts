import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
// import { DataTableResource } from 'angular-4-data-table-bootstrap-4'

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.css'],
})
export class AllItemsComponent implements OnInit, OnDestroy {

  public products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  // tableResource: DataTableResource<Product>;
  public items: any;
  public itemCount: number;

  constructor(private productService: ProductService) {
   this.subscription = this.productService.person$
   .subscribe(products => {
    this.items = this.filteredProducts = this.products = products;
    // this.initializeTable(products)
   });
   }

  //  private initializeTable(products: Product[]){

  //   this.tableResource = new DataTableResource(products);
  //   this.tableResource.query({ offset: 0})
  //   .then(items => this.items = items);
  //   this.tableResource.count()
  //   .then( count => this.itemCount = count);
  //  }

  //  reloadItems(params){
  //    if (!this.tableResource) return;

  //   this.tableResource.query(params)
  //   .then(items => this.items = items);
  //  }

   filter(search: string){
    this.filteredProducts = (search) ?
     this.products.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) :
     this.products;
   }

   ngOnDestroy(){
    this.subscription.unsubscribe()
   }

  ngOnInit(): void {
  }

}

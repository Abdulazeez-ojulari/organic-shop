import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/categories.service';


@Component({
  selector: 'items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.css']
})
export class ItemsFilterComponent{
  public isCollapsed = true;

  categories$;

  @Input('category') category;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
   }

}

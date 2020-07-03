import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQauntityComponent } from './item-qauntity.component';

describe('ItemQauntityComponent', () => {
  let component: ItemQauntityComponent;
  let fixture: ComponentFixture<ItemQauntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemQauntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemQauntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

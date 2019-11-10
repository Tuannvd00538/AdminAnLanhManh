import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSetComponent } from './list-set.component';

describe('ListSetComponent', () => {
  let component: ListSetComponent;
  let fixture: ComponentFixture<ListSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

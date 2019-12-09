import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComboComponent } from './schedule-combo.component';

describe('ScheduleComboComponent', () => {
  let component: ScheduleComboComponent;
  let fixture: ComponentFixture<ScheduleComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

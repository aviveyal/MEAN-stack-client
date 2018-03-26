import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisticsDoughnutComponent } from './satistics-doughnut.component';

describe('SatisticsDoughnutComponent', () => {
  let component: SatisticsDoughnutComponent;
  let fixture: ComponentFixture<SatisticsDoughnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatisticsDoughnutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatisticsDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

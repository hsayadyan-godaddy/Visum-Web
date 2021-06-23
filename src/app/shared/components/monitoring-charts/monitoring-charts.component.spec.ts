import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringChartsComponent } from './monitoring-charts.component';

describe('MonitoringChartsComponent', () => {
  let component: MonitoringChartsComponent;
  let fixture: ComponentFixture<MonitoringChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

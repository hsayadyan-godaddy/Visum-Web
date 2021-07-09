import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneFlowAllocationChartComponent } from './zone-flow-allocation-chart.component';

describe('ZoneFlowAllocationChartComponent', () => {
  let component: ZoneFlowAllocationChartComponent;
  let fixture: ComponentFixture<ZoneFlowAllocationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneFlowAllocationChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneFlowAllocationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

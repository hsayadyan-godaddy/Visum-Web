import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneChartComponent } from './zone-chart.component';

describe('ZoneChartComponent', () => {
  let component: ZoneChartComponent;
  let fixture: ComponentFixture<ZoneChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoneChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

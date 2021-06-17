import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureflowratechartComponent } from './pressureflowratechart.component';

describe('PressureflowratechartComponent', () => {
  let component: PressureflowratechartComponent;
  let fixture: ComponentFixture<PressureflowratechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressureflowratechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressureflowratechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

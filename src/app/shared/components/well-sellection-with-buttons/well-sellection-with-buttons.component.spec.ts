import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellSellectionWithButtonsComponent } from './well-sellection-with-buttons.component';

describe('WellSellectionWithButtonsComponent', () => {
  let component: WellSellectionWithButtonsComponent;
  let fixture: ComponentFixture<WellSellectionWithButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellSellectionWithButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WellSellectionWithButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

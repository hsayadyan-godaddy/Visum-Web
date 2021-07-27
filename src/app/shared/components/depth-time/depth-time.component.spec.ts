import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthTimeComponent } from './depth-time.component';

describe('DepthTimeComponent', () => {
  let component: DepthTimeComponent;
  let fixture: ComponentFixture<DepthTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepthTimeComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

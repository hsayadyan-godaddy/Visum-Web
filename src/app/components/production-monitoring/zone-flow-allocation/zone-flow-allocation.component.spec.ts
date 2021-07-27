import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneFlowAllocationComponent } from './zone-flow-allocation.component';

describe('ZoneFlowAllocationComponent', () => {
  let component: ZoneFlowAllocationComponent;
  let fixture: ComponentFixture<ZoneFlowAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneFlowAllocationComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneFlowAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

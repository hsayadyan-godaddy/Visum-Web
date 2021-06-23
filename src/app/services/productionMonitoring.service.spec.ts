import { TestBed } from '@angular/core/testing';

import { ProductionMonitoringService } from './productionMonitoring.service';

describe('Production.MonitoringService', () => {
  let service: ProductionMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

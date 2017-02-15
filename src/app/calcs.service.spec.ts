/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalcsService } from './calcs.service';

describe('CalcsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcsService]
    });
  });

  it('should ...', inject([CalcsService], (service: CalcsService) => {
    expect(service).toBeTruthy();
  }));
});

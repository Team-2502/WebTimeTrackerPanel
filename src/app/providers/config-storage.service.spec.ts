import { TestBed } from '@angular/core/testing';

import { ConfigStorageService } from './config-storage.service';

describe('ConfigStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigStorageService = TestBed.get(ConfigStorageService);
    expect(service).toBeTruthy();
  });
});

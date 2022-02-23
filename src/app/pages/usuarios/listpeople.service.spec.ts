import { TestBed } from '@angular/core/testing';

import { ListpeopleService } from './listpeople.service';

describe('ListpeopleService', () => {
  let service: ListpeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListpeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

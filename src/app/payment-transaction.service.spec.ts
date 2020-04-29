import { TestBed } from '@angular/core/testing';

import { PaymentTransactionService } from './payment-transaction.service';

describe('PaymentTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentTransactionService = TestBed.get(PaymentTransactionService);
    expect(service).toBeTruthy();
  });
});

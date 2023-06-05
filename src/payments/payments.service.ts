import { Inject } from '@nestjs/common';
import {
  PaymentRepository,
  PaymentRepositoryProviderName,
} from './payment.repository';
import { Service, Transactional } from '@linhx/nest-repo';
import { OUTBOX_PROVIDER, OutBoxService } from '../outbox/outbox.service';

@Service()
@Transactional()
export class PaymentsService {
  constructor(
    @Inject(PaymentRepositoryProviderName)
    private readonly paymentRepository: PaymentRepository,
    @Inject(OUTBOX_PROVIDER) private readonly outboxService: OutBoxService<any>,
  ) {}

  async createPayment({
    paymentMethod,
    value,
    currency,
    orderId,
  }: {
    paymentMethod: any;
    value: number;
    currency: string;
    orderId: string;
  }) {
    // TODO pay
    await this.outboxService.save({
      topic: 'PAYMENT_PAID',
      message: { status: 'successful', orderId },
    });
  }
}

import { Inject } from '@nestjs/common';
import {
  PaymentRepository,
  PaymentRepositoryProviderName,
} from './payment.repository';
import { Service, Transactional } from '@linhx/nest-repo';
import { OUTBOX_PROVIDER, OutBoxService } from '../outbox/outbox.service';
import { Payment } from './entities/payment.entity';
import { payment as PAYMENT_TYPES } from '@linhx-ec/shared-types';

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
    console.log('value', value)
    let payment = new Payment();
    payment.amount = value;
    payment.currency = currency;
    payment = await this.paymentRepository.create(payment);

    await this.outboxService.save({
      topic: PAYMENT_TYPES.eventsName.PAYMENT_PAID,
      message: { status: 'successful', orderId, id: payment.id },
    });
  }
}

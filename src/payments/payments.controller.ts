import { Controller } from '@nestjs/common';
import { Subscribe } from '@linhx/nest-kafka';
import { TOPIC_ORDER_CREATED } from 'src/constants/messages';
import { MsgBody } from '@linhx/nest-kafka/lib/decorators/kafka.decorator';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Subscribe(TOPIC_ORDER_CREATED)
  async createPayment(@MsgBody order) {
    await this.paymentService.createPayment({
      currency: 'VND',
      value: order.totalPrice,
      orderId: order.id,
      paymentMethod: order.paymentMethod,
    });
  }
}

import { Controller } from '@nestjs/common';
import { Subscribe } from '@linhx/nest-kafka';
import { MsgBody } from '@linhx/nest-kafka/lib/decorators/kafka.decorator';
import { PaymentsService } from './payments.service';
import { order as ORDER_TYPES } from '@linhx-ec/shared-types';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  // TODO avoid array payload
  @Subscribe(ORDER_TYPES.eventsName.ORDER_CREATED)
  async createPayment(@MsgBody [order]) {
    await this.paymentService.createPayment({
      currency: 'VND',
      value: order.totalPrice,
      orderId: order._id,
      paymentMethod: order.paymentMethod,
    }); // TODO define type
  }
}

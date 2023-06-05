import {
  PaymentRepository,
  PaymentRepositoryProviderName,
} from './payment.repository';
import { Payment, PaymentDocument } from './entities/payment.entity';
import { ClassProvider, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbMongo, RepositoryImpl } from '@linhx/nest-repo-mongodb';
import { DB_PROVIDER } from '@linhx/nest-repo';

@Injectable()
export class PaymentRepositoryImpl
  extends RepositoryImpl<Payment, string>
  implements PaymentRepository
{
  constructor(
    @Inject(DB_PROVIDER) private readonly db: DbMongo,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {
    super(db, paymentModel);
  }
}

export const PaymentRepositoryProvider: ClassProvider = {
  provide: PaymentRepositoryProviderName,
  useClass: PaymentRepositoryImpl,
};

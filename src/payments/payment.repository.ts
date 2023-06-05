import { Repository } from '@linhx/nest-repo';
import { Payment } from './entities/payment.entity';

export interface PaymentRepository extends Repository<Payment, string> {}

export const PaymentRepositoryProviderName = 'PaymentRepository';

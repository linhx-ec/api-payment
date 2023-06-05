import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Payment {
  get id() {
    return (this as any)._id.toString();
  }
}

export type PaymentDocument = Payment & Document;

export const PaymentSchema = SchemaFactory.createForClass(Payment);

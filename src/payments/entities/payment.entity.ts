import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Payment {
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  currency: string;

  get id() {
    return (this as any)._id.toString();
  }
}

export type PaymentDocument = Payment & Document;

export const PaymentSchema = SchemaFactory.createForClass(Payment);

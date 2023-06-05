import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Outbox {
  @Prop({ required: true })
  transactionUuid: string;

  @Prop({ required: true })
  topic: string;

  @Prop({ type: Object })
  message: object;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  get id() {
    return (this as any)._id.toString();
  }
}

export type OutboxDocument = Outbox & Document;

export const OutboxSchema = SchemaFactory.createForClass(Outbox);

import {
  OutboxRepository,
  OutboxRepositoryProviderName,
} from './outbox.repository';
import { Outbox, OutboxDocument } from './entities/outbox.entity';
import { ClassProvider, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DbMongo,
  MongoTransaction,
  RepositoryImpl,
} from '@linhx/nest-repo-mongodb';
import { DB_PROVIDER, TRANSACTION_STORE } from '@linhx/nest-repo';
import { Message } from '@linhx/nest-kafka';

@Injectable()
export class OutboxRepositoryImpl
  extends RepositoryImpl<Outbox, string>
  implements OutboxRepository
{
  constructor(
    @Inject(DB_PROVIDER) private readonly db: DbMongo,
    @InjectModel(Outbox.name) private outboxModel: Model<OutboxDocument>,
  ) {
    super(db, outboxModel);
  }
  createWithTrxUuid(t: Message): Promise<Outbox> {
    const trxUuid = TRANSACTION_STORE.getTransactionUuid();
    if (!trxUuid) {
      throw new Error('Creating outbox should be inside a transaction');
    }
    const outbox = new Outbox();
    outbox.message = t.message;
    outbox.topic = t.topic;
    outbox.transactionUuid = trxUuid;
    return this.create(outbox);
  }
  findByUserId(userId: string): Promise<Outbox> {
    return this.outboxModel
      .findOne({
        userId,
      })
      .session(TRANSACTION_STORE.getTransaction() as MongoTransaction)
      .exec();
  }
  async softDeleteByTrxUuid(trxUuid: string): Promise<void> {
    await this.outboxModel
      .updateMany(
        {
          transactionUuid: trxUuid,
        },
        {
          $set: {
            deleted: true,
          },
        },
      )
      .session(TRANSACTION_STORE.getTransaction() as MongoTransaction)
      .exec();
  }
}

export const OutboxRepositoryProvider: ClassProvider = {
  provide: OutboxRepositoryProviderName,
  useClass: OutboxRepositoryImpl,
};

import { Repository } from '@linhx/nest-repo';
import { Outbox } from './entities/outbox.entity';
import { Message } from '@linhx/nest-kafka';

export interface OutboxRepository extends Repository<Outbox, string> {
  createWithTrxUuid(t: Message): Promise<Outbox>;
  findByUserId(userId: string): Promise<Outbox | undefined>;
  softDeleteByTrxUuid(trxUuid: string): Promise<void>;
}

export const OutboxRepositoryProviderName = 'OutboxRepository';

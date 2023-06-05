import { Message } from '@linhx/nest-kafka';

export interface OutBoxService<Outbox> {
  save(msg: Message): Promise<Outbox>;
}

export const OUTBOX_PROVIDER = 'OUTBOX_PROVIDER';

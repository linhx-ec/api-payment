import { Global, Module } from '@nestjs/common';
import { OutboxServiceImpl } from './outbox.service.impl';
import { MongooseModule } from '@nestjs/mongoose';
import { Outbox, OutboxSchema } from './entities/outbox.entity';
import { OutboxRepositoryProvider } from './outbox.repository.impl';
import { OUTBOX_PROVIDER } from './outbox.service';

const OUTBOX_SERVICE_PROVIDER = {
  provide: OUTBOX_PROVIDER,
  useClass: OutboxServiceImpl,
};

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Outbox.name, schema: OutboxSchema }]),
  ],
  providers: [OutboxRepositoryProvider, OUTBOX_SERVICE_PROVIDER],
  exports: [OUTBOX_SERVICE_PROVIDER],
})
export class OutboxModule {}

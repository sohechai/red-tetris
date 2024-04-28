import { Module } from '@nestjs/common';
import { AppGateway } from './socket/socket';

@Module({
  imports: [],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
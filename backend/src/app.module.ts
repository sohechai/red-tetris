import { Module } from '@nestjs/common';
import { AppGateway } from './socket/socket.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
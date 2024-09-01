import { Module } from '@nestjs/common';
import { AppGateway } from './socket/socket.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..',  'frontend', 'dist'),
    }),
    // autres modules ici...
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
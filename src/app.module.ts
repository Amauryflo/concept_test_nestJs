import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbServiceService } from './service/db-service/db-service.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DbServiceService],
  exports: [DbServiceService],
})
export class AppModule {}

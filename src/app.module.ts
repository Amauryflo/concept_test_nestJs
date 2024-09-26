import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbServiceService } from './service/db-service/db-service.service';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, DbServiceService, UserService],
  exports: [DbServiceService],
})
export class AppModule {}

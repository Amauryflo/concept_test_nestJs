import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbServiceService } from './service/db-service/db-service.service';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, DbServiceService, AuthService],
  exports: [DbServiceService],
})
export class AppModule {}

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DbServiceService implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Connection;

  async onModuleInit() {
    this.connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'concept_test',
    });
  }

  async onModuleDestroy() {
    await this.connection.end();
  }

  async query(query: string, params?: any[]) {
    const [results] = await this.connection.execute(query, params);
    return results;
  }
}

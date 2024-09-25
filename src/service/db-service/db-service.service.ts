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

  // Iniciar una transacción
  async startTransaction() {
    await this.connection.beginTransaction();
  }

  // Confirmar una transacción
  async commitTransaction() {
    await this.connection.commit();
  }

  // Deshacer una transacción
  async rollbackTransaction() {
    await this.connection.rollback();
  }
}

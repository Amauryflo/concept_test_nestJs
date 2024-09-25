import { BadRequestException, Injectable } from '@nestjs/common';
import { DbServiceService } from '../db-service/db-service.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DbServiceService) {}

  async login(id: number) {
    const query = 'SELECT * FROM users WHERE id = ?';
    return this.dbService.query(query, [id]);
  }

  async signIn({ username, pass }: any) {
    const uuid = uuidv4();
    await this.dbService.startTransaction();

    try {
      const query = 'INSERT INTO users (id, username, pass) VALUES (?,?,?)';
      await this.dbService.query(query, [uuid, username, pass]);
      await this.dbService.commitTransaction();
      return { success: true, message: 'Se registro el usuario correctamente' };
    } catch (e) {
      await this.dbService.rollbackTransaction();
      throw new BadRequestException('Error al crear usuario', e);
    }
  }
}

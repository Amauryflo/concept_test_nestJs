import { BadRequestException, Injectable } from '@nestjs/common';
import { DbServiceService } from '../db-service/db-service.service';
import { v4 as uuidv4 } from 'uuid';
import { QueryResult } from 'mysql2';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbServiceService) {}

  async createUser(username: string, email: string): Promise<void> {
    const uuid = uuidv4();
    await this.dbService.startTransaction();

    try {
      await this.dbService.query('CALL InsertUser(?, ?, ?)', [
        uuid,
        username,
        email,
      ]);
      await this.dbService.commitTransaction();
    } catch (e) {
      await this.dbService.rollbackTransaction();
      throw new BadRequestException(`Error al crear el usuario - ${e}`);
    }
  }

  async getAllUsers(): Promise<QueryResult> {
    await this.dbService.startTransaction();
    try {
      const response = await this.dbService.query('CALL GetAllUsers()');
      await this.dbService.commitTransaction();
      return response[0];
    } catch (e) {
      await this.dbService.rollbackTransaction();
      throw new BadRequestException(
        `Error al obtener lista de usuarios - ${e}`,
      );
    }
  }
  async updateUser(id: string, username: string, email: string): Promise<void> {
    await this.dbService.startTransaction();
    try {
      await this.dbService.query('CALL UpdateUser(?, ?, ?)', [
        id,
        username,
        email,
      ]);
      await this.dbService.commitTransaction();
    } catch (e) {
      await this.dbService.rollbackTransaction();
      throw new BadRequestException(`Error al actualizar usuario - ${e}`);
    }
  }
}

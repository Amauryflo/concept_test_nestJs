import { Injectable } from '@nestjs/common';
import { DbServiceService } from '../db-service/db-service.service';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {
  constructor(private readonly dbService: DbServiceService) {
  }

  async login(id: number) {
    const query = 'SELECT * FROM users WHERE id = ?';
    return this.dbService.query(query, [id]);
  }


  async signIn({ ...queryInfo }: any) {
    const uuid = uuidv4()
    const query = 'INSERT INTO users (id, username, pass, registerDate, lastUpdateDate) VALUES (?,?,?,?,?)';
    // return this.dbService.query(query, [uuid, username, pass, registerDate, lastUpdateDate]);
  }

}

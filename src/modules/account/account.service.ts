import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from 'src/core/entity/person.entity';
import { LoginRequest } from 'src/core/dto/login.dto';
import { Repository } from 'typeorm';
import * as md5 from 'blueimp-md5';
import * as jwt from 'jsonwebtoken';
import {
  CreateAccountResponse,
  LoginResponse,
} from 'src/models/account.response';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(PersonEntity, 'yourmoney')
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async login(login: LoginRequest): Promise<LoginResponse> {
    const userResult = await this.personRepository.findOne({
      where: [{ name: login.name }, { email: login.email }],
    });

    if (!userResult) {
      throw new HttpException(
        { message: 'Erro na autenticação, usuário não encontrado' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (md5(login.password) !== userResult.password) {
      throw new HttpException(
        { message: 'Erro na autenticação, senha está incorreta' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = jwt.sign({ email: userResult.name }, process.env.SECRET_KEY, {
      expiresIn: '1m',
    });

    return {
      token: token,
      message: 'Login success',
    };
  }

  async create(data: LoginRequest): Promise<CreateAccountResponse> {
    const userResult = await this.personRepository.findOne({
      where: [{ name: data.name }, { email: data.email }],
    });

    if (userResult?.name === data.name) {
      throw new HttpException(
        { message: 'Este nome já está sendo usado' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userResult?.email === data.email) {
      throw new HttpException(
        { message: 'Este email já está sendo usado' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const accountResult = this.personRepository.save({
      name: data.name,
      email: data.email,
      password: md5(data.password),
    });

    return {
      message: 'Account created with success',
    };
  }
}

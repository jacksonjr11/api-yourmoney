import { IsEmail, IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: 'Login é um campo obrigatório.' })
  name: string;

  @IsNotEmpty({ message: 'Senha é um campo obrigatório.' })
  password: string;

  @IsOptional()
  email: string;
}

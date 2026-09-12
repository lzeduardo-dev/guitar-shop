import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDTO {
    @IsString()
    name!: string;

    @IsEmail({}, { message: 'Email invalido'})
    email!: string;

    @IsString()
    @MinLength(6, {message: "A senha deve ter no minimo 6 caracteres"})
    password!: string
}

export class LoginDTO {
    @IsEmail()
    email!: string;
  
    @IsString()
    password!: string;
}
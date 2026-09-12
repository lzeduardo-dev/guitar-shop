import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDTO {

    @IsString()
    name!: string;

    @IsEmail({} , {message: "Email Inválido"})
    email!: string;

    @IsString()
    @MinLength(8, {message: "A senha deve ter no minimo 8 digitos" })
    password!: string;
}

export class LoginDTO {
    @IsEmail()
    email!: string;

    @IsString()
    password!: string;
}
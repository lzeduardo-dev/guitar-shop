import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
import bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/auth.dto.js';
import { LoginDTO } from './dto/register.dto.js';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async register(dto: RegisterDTO) {
        // Criptografia
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

        try {
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hashedPassword,
                },
            });
    
            // remove a senha antes de retornar os dados
            const {password, ...safeUser} = user
            return safeUser;

        } catch (error) {
            throw new ConflictException('Email ja esta em uso');
        }
    }

    async login(dto: LoginDTO) {
        const user = await this.prisma.user.findUnique({
            where: {email: dto.email},
        });

        if(!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: user.id, email: user.email };
        const access_token = this.jwtService.sign(payload);

        return {
            access_token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        };
    }
}

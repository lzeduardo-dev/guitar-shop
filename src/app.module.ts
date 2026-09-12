import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ProductsModule } from './modules/products/products.module.js';

@Module({
    imports: [PrismaModule, AuthModule, ProductsModule],
    controllers: [],
    providers: []
})
export class AppModule {}

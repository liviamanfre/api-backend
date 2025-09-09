// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // ou 127.0.0.1
      port: 3306,
      username: 'root',
      password: '1234', // <-- MUITO IMPORTANTE: Coloque a senha que você configurou na instalação do MySQL
      database: 'products', // O nome do banco que criamos no Workbench
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Encontra as entidades automaticamente
      synchronize: true, // Apenas para desenvolvimento! Cria as tabelas automaticamente.
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
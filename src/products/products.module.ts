// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity'; // Importar a entidade

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])], // Registrar a entidade no módulo
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
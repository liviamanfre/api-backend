// src/products/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// 1. Defina uma interface para as opções de paginação
interface FindAllOptions {
  page: number;
  limit: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto, userId: number): Promise<ProductEntity> {
    const newProduct = this.productRepository.create({
      ...createProductDto,
      user: { id: userId },
    });
    return await this.productRepository.save(newProduct);
  }

  /**
   * CORREÇÃO APLICADA AQUI:
   * O método agora aceita um objeto 'options' que contém 'page' e 'limit'.
   * A lógica para calcular 'skip' e usar 'take' foi adicionada.
   */
  async findAll(options: FindAllOptions): Promise<ProductEntity[]> {
    const { page, limit } = options;
    const skip = (page - 1) * limit; // Calcula quantos itens pular

    return await this.productRepository.find({
      skip: skip,
      take: limit,
      relations: ['user'], // Garante que a informação do usuário seja carregada junto
    });
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID #${id} não encontrado.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Produto com ID #${id} não encontrado para atualizar.`);
    }
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
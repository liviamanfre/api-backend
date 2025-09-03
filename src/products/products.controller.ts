import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe, // Pipe para transformar e validar o ID
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

/**
 * O Controller é responsável por receber as requisições HTTP,
 * delegar a lógica de negócio para o Service e retornar a resposta.
 * O decorator @Controller('products') define '/products' como o prefixo de rota
 * para todos os endpoints definidos nesta classe.
 */
@Controller('products')
export class ProductsController {
  /**
   * O construtor injeta a instância do ProductsService,
   * permitindo que o controller utilize seus métodos.
   * @param productsService - A instância do serviço de produtos.
   */
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Rota para criar um novo produto.
   * Mapeado para o método HTTP POST em '/products'.
   * O @Body() decorator extrai os dados do corpo da requisição e os valida
   * usando o CreateProductDto.
   * @param createProductDto - Dados para a criação do produto.
   * @returns O produto recém-criado.
   */
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.create(createProductDto);
  }

  /**
   * Rota para listar todos os produtos.
   * Mapeado para o método HTTP GET em '/products'.
   * @returns Uma lista de todos os produtos.
   */
  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.productsService.findAll();
  }

  /**
   * Rota para buscar um produto específico pelo seu ID.
   * Mapeado para o método HTTP GET em '/products/:id'.
   * O @Param('id', ParseIntPipe) extrai o ID da URL,
   * e o ParseIntPipe o transforma de string para número, além de validar se é um número inteiro.
   * @param id - O ID do produto a ser buscado.
   * @returns O produto encontrado.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    // O ParseIntPipe já fez a conversão de string para number
    return await this.productsService.findOne(id);
  }

  /**
   * Rota para atualizar um produto existente.
   * Mapeado para o método HTTP PUT em '/products/:id'.
   * @param id - O ID do produto a ser atualizado.
   * @param updateProductDto - Os dados para atualização.
   * @returns O produto com os dados atualizados.
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.update(id, updateProductDto);
  }

  /**
   * Rota para remover um produto.
   * Mapeado para o método HTTP DELETE em '/products/:id'.
   * O decorator @HttpCode(HttpStatus.NO_CONTENT) faz com que a resposta
   * retorne o status 204 (No Content) em caso de sucesso, que é a convenção
   * para operações de exclusão bem-sucedidas.
   * @param id - O ID do produto a ser removido.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productsService.remove(id);
  }
}
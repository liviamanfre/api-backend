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
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enum/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import type { UserPayload } from '../auth/interfaces/user-payload.interface';

/**
 * Controller responsável por todos os endpoints relacionados a produtos.
 * Todas as rotas aqui são protegidas e requerem um token JWT válido,
 * pois o AuthGuard é aplicado no nível da classe.
 */
@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Cria um novo produto e o associa ao usuário autenticado.
   * @param createProductDto - Dados para a criação do produto.
   * @param user - Payload do usuário extraído do token JWT pelo decorator @GetUser.
   * @returns O produto recém-criado.
   */
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: UserPayload,
  ): Promise<ProductEntity> {
    const userId = user.userId;
    return await this.productsService.create(createProductDto, userId);
  }

  /**
   * Retorna uma lista paginada de produtos.
   * @param page - O número da página a ser retornada. Padrão: 1.
   * @param limit - O número de itens por página. Padrão: 10.
   * @returns Uma lista de produtos.
   */
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    // Garante que o limite não seja excessivo para proteger o servidor
    limit = limit > 100 ? 100 : limit;
    return await this.productsService.findAll({ page, limit });
  }

  /**
   * Busca um produto específico pelo seu ID.
   * @param id - O ID do produto a ser buscado.
   * @returns O produto encontrado.
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductEntity> {
    return await this.productsService.findOne(id);
  }

  /**
   * Atualiza um produto existente.
   * (Para um cenário real, você adicionaria uma lógica no service para
   * verificar se o usuário logado é o dono do produto antes de atualizar).
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
   * Remove um produto.
   * Esta rota é protegida por dois Guards:
   * 1. AuthGuard('jwt'): Garante que o usuário está autenticado.
   * 2. RolesGuard: Garante que o usuário autenticado tem o papel de 'Admin'.
   * @param id - O ID do produto a ser removido.
   */
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.productsService.remove(id);
  }
}
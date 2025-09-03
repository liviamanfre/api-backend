import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  /**
   * O construtor injeta o repositório do TypeORM para a entidade ProductEntity.
   * A partir de agora, `this.productRepository` pode ser usado para executar
   * operações de banco de dados na tabela 'products'.
   * @param productRepository - O repositório injetado para a entidade Product.
   */
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  /**
   * Cria um novo produto no banco de dados.
   * @param createProductDto - O DTO com os dados para criar o novo produto.
   * @returns A entidade do produto recém-criado.
   */
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    // Cria uma instância da entidade com base no DTO, mas ainda não salva no banco.
    const newProduct = this.productRepository.create(createProductDto);
    // Salva a entidade no banco de dados e retorna o resultado.
    return await this.productRepository.save(newProduct);
  }

  /**
   * Busca e retorna todos os produtos do banco de dados.
   * @returns Uma lista (array) de todas as entidades de produto.
   */
  async findAll(): Promise<ProductEntity[]> {
    // .find() sem argumentos retorna todos os registros da tabela.
    return await this.productRepository.find();
  }

  /**
   * Busca um único produto pelo seu ID.
   * @param id - O ID do produto a ser encontrado.
   * @returns A entidade do produto encontrado.
   * @throws {NotFoundException} se nenhum produto com o ID fornecido for encontrado.
   */
  async findOne(id: number): Promise<ProductEntity> {
    // .findOneBy() busca o primeiro registro que corresponde aos critérios.
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Produto com ID #${id} não encontrado.`);
    }

    return product;
  }

  /**
   * Atualiza os dados de um produto existente.
   * @param id - O ID do produto a ser atualizado.
   * @param updateProductDto - O DTO com os dados a serem atualizados.
   * @returns A entidade do produto com os dados atualizados.
   * @throws {NotFoundException} se o produto a ser atualizado não for encontrado.
   */
  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    // .preload() encontra a entidade pelo ID e mescla os novos dados do DTO nela.
    // Retorna a entidade mesclada, mas ainda não salva.
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID #${id} não encontrado para atualizar.`);
    }

    // Salva a entidade atualizada de volta no banco de dados.
    return await this.productRepository.save(product);
  }

  /**
   * Remove um produto do banco de dados pelo seu ID.
   * @param id - O ID do produto a ser removido.
   * @returns Uma promessa vazia (void) após a remoção.
   * @throws {NotFoundException} se o produto a ser removido não for encontrado.
   */
  async remove(id: number): Promise<void> {
    // Reutilizamos o método findOne para garantir que o produto exista antes de tentar removê-lo.
    // Isso também aciona a NotFoundException se ele não existir.
    const product = await this.findOne(id);

    // .remove() exclui a entidade do banco de dados.
    await this.productRepository.remove(product);
  }
}
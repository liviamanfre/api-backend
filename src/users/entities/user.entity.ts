import { ProductEntity } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' }) // Mapeia esta classe para uma tabela chamada 'users'
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Define que o valor nesta coluna deve ser único no banco
  email: string;

  @Column() // Define a coluna para armazenar o hash da senha
  password: string;

  // Relação One-to-Many: Um usuário pode ter muitos produtos.
  // O primeiro argumento aponta para a entidade relacionada.
  // O segundo argumento (product => product.user) aponta de volta para o campo 'user' na ProductEntity.
  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];
}
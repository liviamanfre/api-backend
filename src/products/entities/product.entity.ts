// src/products/entities/product.entity.ts
import { UserEntity } from '../../users/entities/user.entity'; // Importar UserEntity
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'; // Importar ManyToOne

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  
  // Define o lado "Muitos" da relação. Muitos produtos para um usuário.
  // Isso criará uma coluna 'userId' no banco de dados automaticamente.
  @ManyToOne(() => UserEntity, (user) => user.products, { eager: true }) // eager: true carrega o usuário automaticamente
  user: UserEntity;
}
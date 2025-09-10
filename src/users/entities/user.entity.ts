// src/users/entities/user.entity.ts

import { ProductEntity } from '../../products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../../common/enum/role.enum'; // 1. Importar o Enum

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // 2. Adicionar a nova coluna 'role'
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User, // Todo novo usuário será 'user' por padrão
  })
  role: Role;

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // Registra a UserEntity para que o repositório possa ser injetado
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporta o UsersService para que o AuthModule possa usá-lo
})
export class UsersModule {}
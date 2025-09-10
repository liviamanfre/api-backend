import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  /**
   * O array 'imports' é onde conectamos todos os módulos da nossa aplicação
   * e configuramos módulos de terceiros, como o TypeOrmModule.
   */
  imports: [
    /**
     * TypeOrmModule.forRoot() estabelece a conexão principal com o banco de dados.
     * Esta configuração é carregada uma vez no módulo raiz.
     */
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234', // IMPORTANTE: Coloque sua senha do MySQL aqui
      database: 'products',

      /**
       * Esta opção encontra automaticamente todas as classes no projeto
       * que estão decoradas com @Entity e as carrega.
       */
      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      /**
       * synchronize: false é a configuração recomendada para produção.
       * Significa que o TypeORM NÃO tentará alterar o schema do banco de dados
       * automaticamente. Em vez disso, devemos usar migrations para gerenciar
       * as mudanças na estrutura do banco de forma segura.
       */
      synchronize: false,
    }),

    /**
     * Importando nossos módulos de funcionalidade. Cada um deles encapsula
     * uma parte específica da lógica da nossa aplicação.
     */
    ProductsModule,
    UsersModule,
    AuthModule,
  ],

  /**
   * O AppController e o AppService são os padrões gerados pelo NestJS.
   * Geralmente são usados para endpoints básicos, como uma rota de status
   * ou "health check" da API.
   */
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
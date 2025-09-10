import { DataSource } from 'typeorm';

/**
 * Este arquivo de configuração é usado exclusivamente pela CLI do TypeORM
 * para gerar e executar migrations. Ele precisa de suas próprias
 * credenciais de banco de dados.
 */
export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234', // IMPORTANTE: Coloque sua senha do MySQL aqui
  database: 'products',

  // Caminho para encontrar as entidades. É importante que corresponda ao que está no AppModule.
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // Caminho para onde as migrations serão geradas e de onde serão lidas.
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
});
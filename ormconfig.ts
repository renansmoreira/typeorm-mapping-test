import { CustomNamingStrategy } from './custom-naming-strategy';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'mytestdb',
    password: 'mytestdb',
    database: 'mytestdb',
    port: 5432,
    ssl: false,
    entities: ['./models/**/*{.ts,.js}'],
    migrations: ['./migrations/**/*{.ts,.js}'],
    logging: false,
    namingStrategy: new CustomNamingStrategy()
  });
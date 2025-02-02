import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { MovieEntity } from './entities/movie.entity'
import { UserEntity } from './entities/user.entity'

config()

const configService = new ConfigService()

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: +configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USERNAME'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_NAME'),
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
  migrations: ['./src/infra/database/migrations/*.ts'],
}

export default new DataSource(dataSourceOptions)

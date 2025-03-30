import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContestModule } from 'src/contest/contest.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT ?? '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      synchronize: true,
      migrationsTableName: 'migrations',
      migrations: ['src/migrations/*.ts'],
    }),
    UserModule,
    ContestModule,
    TransactionModule,
    AuthModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}

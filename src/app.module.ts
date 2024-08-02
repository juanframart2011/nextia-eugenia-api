import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // Cambia esto por tu base de datos
      host: '104.237.149.181',
      port: 3306,
      username: 'root',
      password: 'Mysql784754*-',
      database: 'nexti-eugenia-api',
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*.ts'],
      migrationsTableName: "migration_table",
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    InvitationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

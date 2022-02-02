import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Board from './boards/board.entity';
import { BoardModule } from './boards/board.module';
import Columns from './columns/column.entity';
import { UserTable1643720396584 } from './db/migration/1643720396584-UserTable';
import { BoardTable1643811902642 } from './db/migration/1643811902642-BoardTable';
import { ColumnsTable1643817591809 } from './db/migration/1643817591809-ColumnsTable';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Board, Columns],
      synchronize: false,
      migrations: [
        UserTable1643720396584,
        BoardTable1643811902642,
        ColumnsTable1643817591809,
      ],
      migrationsRun: true,
    }),
    UsersModule,
    BoardModule,
  ],
})
export class AppModule { }

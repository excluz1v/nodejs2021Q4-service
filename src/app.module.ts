import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Board from './boards/board.entity';
import { BoardModule } from './boards/board.module';
import Columns from './columns/column.entity';
import { PostRefactoring1642325483900 } from './db/migration/1642325483900-PostRefactoring';
import Task from './tasks/task.entity';
import { TasksModule } from './tasks/task.module';
import User from './users/user.entity';
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
      entities: [User, Board, Columns, Task],
      synchronize: false,
      migrations: [PostRefactoring1642325483900],
      migrationsRun: true,
    }),
    UsersModule,
    BoardModule,
    TasksModule,
  ],
})
export class AppModule {}

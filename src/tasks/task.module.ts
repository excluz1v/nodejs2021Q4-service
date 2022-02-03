import { Module } from '@nestjs/common';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([Task])],
})
export class UsersModule { }

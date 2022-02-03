import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  userId?: string | null;

  @IsNotEmpty()
  @IsString()
  boardId: string;

  @IsOptional()
  @IsString()
  columnId?: string | null;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

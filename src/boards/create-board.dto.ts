import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class Column {
  @IsString()
  title: string;
  @IsString()
  id: string;

  @IsInt()
  order: number;
}
export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Column)
  columns: Column[];
}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsUUID()
  @IsOptional()
  id?: string;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateHabitDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

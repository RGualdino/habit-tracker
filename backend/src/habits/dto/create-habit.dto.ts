import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

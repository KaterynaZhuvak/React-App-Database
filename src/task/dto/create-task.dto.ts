import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class CreateTaskDto {
  id: number;

  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  priority: 'Low | Medium | High';

  @IsNotEmpty()
  status: Category;
}

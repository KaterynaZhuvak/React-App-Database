import { IsNotEmpty } from "class-validator";
import { Task } from "src/task/entities/task.entity";

export class CreateCategoryDto {
    @IsNotEmpty()
    title: string;
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: createTaskDto.id,
      title: createTaskDto.title,
      description: createTaskDto.description,
      priority: createTaskDto.priority,
      status: { id: +createTaskDto.status },
    };

    if (!newTask) {
      throw new BadRequestException('Something went wrong!');
    }

    return await this.taskRepository.save(newTask);
  }

  async findAll() {
    const isExist = await this.taskRepository.find({
      order: {
        createdAt: 'DESC',
      }
    });

    if (!isExist) {
      throw new NotFoundException('Task not found!');
    }
    return isExist;
  }

  async findOne(id: number) {
    const isExist = await this.taskRepository.findOne({
      where: { id },
      relations: {
        status: true,
      }
    });
    if (!isExist) {
      throw new NotFoundException('Task not found!');
    }
    return isExist;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const isExist = await this.taskRepository.findOne({
      where: { id },
    });

    if (!isExist) {
      throw new NotFoundException('Task not found!');
    }
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    const isExist = await this.taskRepository.findOne({
      where: { id },
    });

    if (!isExist) {
      throw new NotFoundException('Task not found!');
    }
    return await this.taskRepository.delete(id);
  }
}

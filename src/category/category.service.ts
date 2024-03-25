import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    ) { }
  
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = {
      title: createCategoryDto.title,
    };
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

   async findOne(id: number) {
    const isExist = await this.categoryRepository.findOne({
      where: {id}
    });
    if (!isExist) {
      throw new NotFoundException('Category not found!')
    }
    return isExist;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const isExist = await this.categoryRepository.findOne({
      where: {id}
    })

    if (!isExist) {
      throw new NotFoundException('Category not found!')
    }
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

 async remove(id: number) {
   const isExist = await this.categoryRepository.findOne({
  where: {id}
   })
   
   if (!isExist) { 
     throw new NotFoundException('Category not found!')
   }
    return await this.categoryRepository.delete(id);
  }
}

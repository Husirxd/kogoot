import { Controller } from '@nestjs/common';
//import { CategoryService } from './category.service';
import { Post, Body, Get } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
@Controller('category')
export class CategoryController {
    constructor(
    private readonly categoryService: CategoryService

    ) {}
    
    @Get()
    async getCategories(
        
    ) {
        return await this.categoryService.getCategories();
    }

    
}
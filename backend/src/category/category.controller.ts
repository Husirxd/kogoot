import { Controller } from '@nestjs/common';
//import { CategoryService } from './category.service';
import { Post, Body, Get } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { ApiResponse } from '@nestjs/swagger';
@Controller('category')
export class CategoryController {
    constructor(
    private readonly categoryService: CategoryService
    ) {}
    
    @ApiResponse({ status: 200, description: 'Returns all categories'})
    @Get()
    async getCategories() {
        return await this.categoryService.getCategories();
    }

    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.createCategory(createCategoryDto);
    }
    
}
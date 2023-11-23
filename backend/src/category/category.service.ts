import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto } from './dto/create-category.dto';
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ){};
   
    async getCategories(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async createCategory(category: CreateCategoryDto): Promise<Category> {
        return this.categoryRepository.save(category);
    }

}
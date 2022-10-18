import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Categories } from "../entities/categories.entity";
import { CategoryService } from "../services/category.service";

@Controller("/categories")
export class CategoryController{
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categories[]> {

        return this.categoryService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categories>{
        return this.categoryService.findById(id);
    }

    @Get('/category/:category')
    @HttpCode(HttpStatus.OK)
    findByCategory(@Param('category') category: string): Promise<Categories[]>{
        return this.categoryService.findByCategory(category);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categories: Categories): Promise<Categories>{
        return this.categoryService.create(categories);
    }
}
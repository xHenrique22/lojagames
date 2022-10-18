import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "./controllers/category.controller";
import { Categories } from "./entities/categories.entity";
import { CategoryService } from "./services/category.service";


@Module({
    imports:[TypeOrmModule.forFeature([Categories])],
    controllers:[CategoryController],
    providers:[CategoryService],
    exports: [TypeOrmModule]
})
export class CategoriesModule {

  
}
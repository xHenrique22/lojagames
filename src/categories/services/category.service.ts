import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Categories } from "../entities/categories.entity";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Categories) private categoriesReposity: Repository<Categories>){}

    async findAll(): Promise <Categories[]>{

        return await this.categoriesReposity.find();
    }

    async findById(id: number): Promise<Categories>{

        let categories = await this.categoriesReposity.findOne({
            where: {
                id
            }
        });

        if(!categories)
            throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);

            return categories;
    }

    async findByCategory(category: string): Promise<Categories[]>{
        return await this.categoriesReposity.find({
            where:{
                category: ILike(`%${category}%`)
            }
        })
    }

    async create(categories: Categories): Promise<Categories>{
        return await this.categoriesReposity.save(categories)
    }

}
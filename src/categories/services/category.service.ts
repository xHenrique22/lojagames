import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categories } from "../entities/categories.entity";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Categories) private categoriesReposity: Repository<Categories>){}

    async findAll(): Promise <Categories[]>{

        return await this.categoriesReposity.find({
            relations:{
                products:true,
                user: true
            }
        });
    }

    async findById(id: number): Promise<Categories>{

        let categories = await this.categoriesReposity.findOne({
            where: {
                id
            },
            relations:{
                products:true,
                user: true
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
            },
            relations:{
                products:true,
                user: true
            }
        })
    }

    async create(categories: Categories): Promise<Categories>{
        return await this.categoriesReposity.save(categories)
    }

    async update(categories: Categories): Promise<Categories> {

        let searchCategory: Categories = await this.findById(categories.id);

        if (!searchCategory || !categories.id)
            throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);

        return await this.categoriesReposity.save(categories);

    }

    async delete(id: number): Promise<DeleteResult> {

        let searchCategory = await this.findById(id);

        if(!searchCategory)
            throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);

        return await this.categoriesReposity.delete(id);
    }
}
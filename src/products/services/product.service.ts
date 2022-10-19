import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Products } from "../entities/product.entity";

@Injectable()

export class ProductService {
    constructor(@InjectRepository(Products) private productsRepository: Repository<Products>){}

    async findAll(): Promise <Products[]>{
        
        return this.productsRepository.find({
            relations:{
                categories:true
            }
        });
    }

    async findById(id: number): Promise<Products>{

        let products = await this.productsRepository.findOne({
            where: {
                id
            },
            relations: {
                categories: true
            }
        });

        if(!products)
            throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);

            return products;
    }

    async findByProduct(product: string): Promise<Products[]>{
        return await this.productsRepository.find({
            where:{
                product: ILike(`%${product}%`)
            },
            relations:{
                categories: true
            }
        })
    }

    async create(products: Products): Promise<Products>{
        return await this.productsRepository.save(products)
    }

    async update(products: Products): Promise<Products> {

        let searchProduct: Products = await this.findById(products.id);

        if (!searchProduct || !products.id)
            throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);

        return await this.productsRepository.save(products);

    }

    async delete(id: number): Promise<DeleteResult> {

        let searchProduct = await this.findById(id);

        if(!searchProduct)
            throw new HttpException('Product not found!', HttpStatus.NOT_FOUND);

        return await this.productsRepository.delete(id);
    }
}
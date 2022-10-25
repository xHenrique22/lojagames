import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { Products } from "../entities/product.entity";
import { ProductService } from "../services/product.service";

@UseGuards(JwtAuthGuard)
@Controller("/products")
export class ProductController{
    constructor(private readonly productService: ProductService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Products[]> {

        return this.productService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Products>{
        return this.productService.findById(id);
    }

    @Get('/product/:product')
    @HttpCode(HttpStatus.OK)
    findByProduct(@Param('product') product: string): Promise<Products[]>{
        return this.productService.findByProduct(product);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() products: Products): Promise<Products>{
        return this.productService.create(products);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() products: Products): Promise<Products> {
        return this.productService.update(products);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.productService.delete(id);
    }
}
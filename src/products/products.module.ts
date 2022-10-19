import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./controllers/product.controller";
import { Products } from "./entities/product.entity";
import { ProductService } from "./services/product.service";


@Module({
    imports: [TypeOrmModule.forFeature([Products])],
    controllers: [ProductController],
    providers:[ProductService],
    exports: [TypeOrmModule]
})
export class ProductsModule{}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { Categories } from './categories/entities/categories.entity';
import { Products } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'db_lojagames',
      entities: [Products,Categories],
      synchronize: true
    }),
    CategoriesModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

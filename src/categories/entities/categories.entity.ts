import { IsNotEmpty } from "class-validator";
import { Products } from "src/products/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_categories'})
export class Categories {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    category: string;

    @UpdateDateColumn()
    date: Date;
    
    @OneToMany(() => Products, (products) => products.categories)
    products: Products[];

    @ManyToOne(() => User, (user) => user.categories,  {
        onDelete:'CASCADE'
    })
    user: User
}
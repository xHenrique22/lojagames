import { IsNotEmpty } from "class-validator";
import { Categories } from "src/categories/entities/categories.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_product'})
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    product: string;

    @UpdateDateColumn()
    date: Date;

    @ManyToOne(() => Categories, (categories) => categories.products,{
        onDelete: "CASCADE"
    })
    categories: Categories
}
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Categories } from "src/categories/entities/categories.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity({name: "tb_users"})
export class User {

    @PrimaryGeneratedColumn() 
    public id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    public name: string

    @IsEmail()
    @Column({length: 255, nullable: false })
    public user: string

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false }) 
    public password: string

    @Column({length: 5000 }) 
    public photo: string

    @OneToMany(() => Categories, (categories) => categories.user)
    categories: Categories[]

}
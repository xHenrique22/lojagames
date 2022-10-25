import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@Controller('/user')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise <User[]> {
        return this.userService.findAll()
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async create (@Body() user: User): Promise<User> {
        return await this.userService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update')
    @HttpCode(HttpStatus.OK)
    async update (@Body() user: User): Promise<User> {
        return this.userService.update(user)
    }
    
}
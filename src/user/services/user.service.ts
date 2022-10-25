import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) { }

    async findByUser(user: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                user: user
            }
        })
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find(
            {
                relations:{
                    categories: true
                }
            }
        );

    }

    async findById(id: number): Promise<User> {

        let user = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                categories: true
            }
        });

        if (!user)
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

        return user;

    }

    async create(user: User): Promise<User> {
        
        let searchUser = await this.findByUser(user.user);

        if (!searchUser) {
            user.password = await this.bcrypt.encryptedPassword(user.password)
            return await this.userRepository.save(user);
        }

        throw new HttpException("User already exists!", HttpStatus.BAD_REQUEST);

    }

    async update(user: User): Promise<User> {

        let updateUser: User = await this.findById(user.id);
        let searchUser = await this.findByUser(user.user);

        if (!updateUser)
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

        if (searchUser && searchUser.id !== user.id)
            throw new HttpException('User (email) already registered!', HttpStatus.BAD_REQUEST);

        user.password = await this.bcrypt.encryptedPassword(user.password)
        return await this.userRepository.save(user);

    }

}
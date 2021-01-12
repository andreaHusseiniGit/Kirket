import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email }});

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            throw new HttpException('Password incorrect', HttpStatus.UNAUTHORIZED);
        }
        delete user.password;
        const token = this.getToken(user);
        return { token }
    }

    async register(email: string, name: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email }})
        if (user) {
            throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = this.userRepository.create({
            email,
            name,
            password: bcrypt.hashSync(password, 10),  
        });

        const savedUser = await this.userRepository.save(createdUser);
        delete savedUser.password;

        const token = this.getToken(savedUser);
        return { token }
    }

    getToken(user: User) {
        return jwt.sign({ user }, 'secret');
    }

}

import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
        if (existUser) {
            throw new UnprocessableEntityException('Email already exists');
        }

        return this.usersRepository.save({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 7)
        })
    }

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOne({ where: { id } })
    }

    findOneByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } })
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.usersRepository.update({ id }, updateUserDto);
    }

    remove(id: number) {
        return this.usersRepository.delete({ id })
    }

    async banUser(banUserDto: BanUserDto) {
        const user = await this.usersRepository.findOne({ where: { id: banUserDto.userId } });
        if (!user) {
            throw new NotFoundException('User not found!')
        }
        user.banned = true;
        user.banReason = banUserDto.banReason;
        return this.usersRepository.save(user);
    }
}

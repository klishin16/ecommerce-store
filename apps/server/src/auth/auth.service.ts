import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {UsersService} from "../users/users.service";
import {User} from "../users/entities/user.entity";
import {JwtService} from "@nestjs/jwt";
import { RegistrationDto } from "./dto/registration.dto";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credentials are not valid')
        }

        return user;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async registration(registrationDto: RegistrationDto) {
        const user = await this.usersService.create(registrationDto);
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
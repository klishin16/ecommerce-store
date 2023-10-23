import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketsModule } from './baskets/baskets.module';
import { DevicesModule } from './devices/devices.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Basket } from './baskets/entities/basket.entity';
import { Brand } from './brands/entities/brand.entity';
import { Category } from './categories/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Device } from './devices/entities/device.entity';
import { User } from './users/entities/user.entity';
import { Purchase } from './baskets/entities/purchase.entity';
import { StorageModule } from './storage/storage.module';
import { SettingsModule } from './settings/settings.module';
import Joi from 'joi';
import { Settings } from './settings/entities/settings.entity';
import { StatisticsModule } from './statistics/statistics.module';

const entity_modules = [
    BasketsModule,
    DevicesModule,
    BrandsModule,
    CategoriesModule,
    UsersModule,
    FilesModule,
    SettingsModule,
];

@Module({
    imports: [
        AuthModule,
        ...entity_modules,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test', 'provision')
                    .default('development'),
                PORT: Joi.number().default(4000),
                DB_USER: Joi.string().required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.string(),
                DB_NAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT', undefined),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [
                    Basket,
                    Brand,
                    Category,
                    Device,
                    User,
                    Purchase,
                    Settings,
                ],
                synchronize: true,
                ssl: configService.get('NODE_ENV') === 'production',
            }),
            inject: [ConfigService],
        }),
        MulterModule.register({
            dest: './uploads',
        }),
        StorageModule,
        StatisticsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

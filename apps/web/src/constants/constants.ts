import * as process from "process";

export const BACKEND_URL =  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000/';
export const IMAGE_STORAGE_URL = process.env.IMAGE_STORAGE_URL ?? 'https://ucarecdn.com/'

export const TOKEN_KEY = 'token';

export enum ERoutes {
    LOGIN = '/auth/login',
    REGISTRATION = '/auth/register',
    ADMIN = '/admin',
    INDEX = '/',
    DEVICES = '/store/devices',
    BASKET = '/store/basket',
    PROFILE = '/profile'
}

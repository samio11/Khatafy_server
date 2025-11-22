"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    NODE_ENV: process.env.NODE_ENV,
    BCRYPT_SALT: process.env.BCRYPT_SALT,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_FROM: process.env.SMTP_FROM,
    SMTP_PASS: process.env.SMTP_PASS,
    CLUDINARY_NAME: process.env.CLUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    RedisUserName: process.env.RedisUserName,
    RedisPassword: process.env.RedisPassword,
    RedisHost: process.env.RedisHost,
    RedisPort: process.env.RedisPort,
    FRONTEND_URL: process.env.FRONTEND_URL,
};

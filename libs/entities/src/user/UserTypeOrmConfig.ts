import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./UserEntity";


export const userTypeOrmConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.USER_POSTGRES_USER,
    password: process.env.USER_POSTGRES_PASSWORD,
    database: process.env.USER_POSTGRES_DB,
    synchronize: true,
    entities: [User],
}

import { FindOneOptions, Repository } from "typeorm";
import { User } from "./UserEntity";


export class UserQueryRepository extends Repository<User> {
}

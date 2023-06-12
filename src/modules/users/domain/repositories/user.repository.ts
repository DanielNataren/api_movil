import { Err, Result } from "neverthrow";
import UserEntity from "../entities/user.entity";
import User from "../../infrastructure/models/user.model";
import Content from "../../../contents/infrastructure/models/content.model";

export interface UserData{
    id?: number;
    username?: string;
    name?: string;
    last_name?: string;
    password?: string;
    content? : Content[];
}

export default interface UserRepository {
    create(data: UserEntity): Promise<UserResult>;
    edit(data: Partial<UserEntity>): Promise<UserResult>;
    read(): Promise<UserListResult>;
    delete(data: Partial<UserEntity>): Promise<UserDeleteResult>;
    getById(id:number): Promise<UserResult>;
}

export type UserResult = Result<User, Error>;

export type UserListResult = Result<User[], Error>;
export type UserDeleteResult = Result<string, Error>;
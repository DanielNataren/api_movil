import { InternalServerErrorException } from "../../../core/exceptions/internalserver.exception";
import UserEntity from "../domain/entities/user.entity";
import UserRepository, { UserData } from "../domain/repositories/user.repository";
import bcryptjs from "bcryptjs";

export default class UserApplication {
    constructor(
        private readonly repository: UserRepository
    ){}
    async create(data: UserData){
        const salt = bcryptjs.genSaltSync(7);
        const hashedPassword: string = bcryptjs.hashSync(data.password, salt)
        delete data.password;
        const user = new UserEntity({...data, password: hashedPassword})
        const userResult = await this.repository.create(user);
        if(userResult.isErr())
            throw new InternalServerErrorException(userResult.error.message);
        return userResult.value;
    }
    async read(){
        const userResult = await this.repository.read();
        if(userResult.isErr())
            throw new InternalServerErrorException(userResult.error.message);
        return userResult.value;
    }
    async edit(data: UserData){
        const user = new UserEntity({...data});
        const userResult = await this.repository.edit(user);
        if(userResult.isErr())
            throw new InternalServerErrorException(userResult.error.message);
        return userResult.value;
    }
    async delete(data: UserData){
        const user = new UserEntity({...data});
        const userResult = await this.repository.delete(user);
        if(userResult.isErr())
            throw new InternalServerErrorException(userResult.error.message);
        return userResult.value;
    }
    async getById(id:number ){
        const userResult = await this.repository.getById(id);
        if(userResult.isErr())
            throw new InternalServerErrorException(userResult.error.message);
        return userResult.value;
    }
}
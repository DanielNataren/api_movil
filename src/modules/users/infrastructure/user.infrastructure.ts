import { Repository } from "typeorm";
import UserRepository, { UserDeleteResult, UserListResult, UserResult } from "../domain/repositories/user.repository";
import User from "./models/user.model";
import { dataSource } from "../../../bootstrap/database.bootstrap";
import { IError } from "../../../core/exceptions/error.exception";
import {err, ok} from "neverthrow";
import UserEntity from "../domain/entities/user.entity";

export default class UserInfrastructure implements UserRepository {
    private readonly model: Repository<User>;
    constructor(){
        this.model = dataSource.getRepository(User);
    }
    async getById(id: number): Promise<UserResult> {
        try {
            const user = await this.model.findOneBy({id});
            if (!user){
                const resultErr = new IError('No se encontró al usuario');
                return err(resultErr);
            }
            return ok(user);
        } catch (error) {
            const resultErr = new IError('Error al momento de buscar el usuario: ' + error.message, 500);
            return err(resultErr);
        }

    }
    async edit(data: Partial<UserEntity>): Promise<UserResult> {
        try {
            const userA = await this.model.findOneBy({id: data.properties().id});
            await this.model.update(userA, {...data.properties()});
            const user = await this.model.findOneBy({id: data.properties().id});
            return ok(user);
        } catch (error) {
            const resultErr = new IError('Error al momento de editar: ' + error.message, 500);
            return err(resultErr);
        }
    }
    async read(): Promise<UserListResult> {
        try {
            const userList = await this.model.find();
            return ok(userList);
        } catch (error) {
            const resultErr = new IError('Error al momento de consultar: ' + error.message, 500);
            return err(resultErr);
        }
    }
    async delete(data: Partial<UserEntity>): Promise<UserDeleteResult> {
        try {
            const user = await this.model.findOneBy({id: data.properties().id});
            await this.model.remove(user);
            return ok("Usuario eliminado");
        } catch (error) {
            const resultErr = new IError('Error al momento de eliminar: ' + error.message, 500);
            return err(resultErr);
        }
    }
    async create(data: UserEntity): Promise<UserResult> {
        try {
            const user = this.model.create(data.properties())
            await this.model.save(user);
            return ok(user);
        } catch (error) {
            const resultErr = new IError('Error al momento de salvar: ' + error.message, 500);
            return err(resultErr);
        }
    }

    static async getById(id: number): Promise<UserResult> {
        try {
            const model = dataSource.getRepository(User);
            const user = await model.findOneBy({id});
            if (!user){
                const resultErr = new IError('No se encontró al usuario');
                return err(resultErr);
            }
            return ok(user);
        } catch (error) {
            const resultErr = new IError('Error al momento de buscar el usuario: ' + error.message, 500);
            return err(resultErr);
        }

    }
    
}
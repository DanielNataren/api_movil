import { Request, Response } from "express";
import UserApplication from "../../application/user.application";
import { UserData } from "../../domain/repositories/user.repository";


export default class UserController {
    constructor(
        private readonly app: UserApplication
    ){
        this.create = this.create.bind(this);
        this.edit = this.edit.bind(this);
        this.read = this.read.bind(this);
        this.delete = this.delete.bind(this);
        this.getById = this.getById.bind(this);
    }
    async getById(req:Request, res: Response ){
        try {
            const id = req.params.id;
            const user = await this.app.getById(parseInt(id));
            return res.json(user);
        } catch (error) {
            return res.status(error.status).json({
                msg: error.message
            });
        }
    }
    async create(req: Request, res: Response){
        try {
            const data: UserData = req.body;
            const user = await this.app.create(data);
            return res.json(user);
        } catch (error) {
            return res.status(error.status).json({
                msg: error.message
            });
        }
    }
    async edit(req: Request, res: Response){
        try {
            const id = req.params.id;
            const data: UserData = req.body;
            data.id = parseInt(id);
            // const data: UserData = {id: Number.parseInt(id)};
            const user = await this.app.edit(data);
            return res.json(user);
        } catch (error) {
            return res.status(error.status).json({
                msg: error.message
            });
        }
    }
    async read(req: Request, res: Response){
        try {
            const userList = await this.app.read();
            return res.json(userList);
        } catch (error) {
            return res.status(error.status).json({
                msg: error.message
            });
        }
    }
    async delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            const data: UserData = {id: Number.parseInt(id)};
            const message = await this.app.delete(data);
            return res.json(message);
        } catch (error) {
            return res.status(error.status).json({
                msg: error.message
            });
        }
    }
}
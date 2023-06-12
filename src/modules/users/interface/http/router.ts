import express from 'express';
import UserController from './controller';

export default class UserRouter {
    private readonly _router: express.Router;
    constructor(
        private readonly controller: UserController
    ){
        this._router = express.Router();
        this.mountRoutes();
    }
    mountRoutes(){
        this._router.post("/", this.controller.create);
        this._router.put("/:id", this.controller.edit);
        this._router.get("/", this.controller.read);
        this._router.delete("/:id", this.controller.delete);
        this._router.get("/:id", this.controller.getById);
    }
    get router(){
        return this._router;
    }
}
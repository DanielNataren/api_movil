import express from 'express';
import ContentController from './controller';
export default class  ContentRouter {
    private readonly _router: express.Router;
    constructor(
        private readonly controller: ContentController
    ){
        this._router = express.Router();
        this.mountRoutes();
    }
    mountRoutes(){
        this._router.post("/", this.controller.create);
        this._router.get("/:type", this.controller.getBytype);
    }
    get router(){
        return this._router;
    }
}
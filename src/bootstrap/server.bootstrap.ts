import { Application, Request, Response, Router } from "express";
import path from "path";
import { paths } from "../helpers/paths";
import cors from 'cors';
import express from "express";
import fileUpload from 'express-fileupload';
import http from 'http';
import ContentInfrastructure from "../module/infrastructure/content.infrastructure";
import ContentApplication from "../module/application/user.application";
import ContentController from "../module/interface/controller";
import ContentRouter from "../module/interface/router";

export default class Server {
    private readonly app: Application;
    private port: string | number;
    private paths: paths;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.paths = {
            content: '/content',
        };
        this.middlewares();
        this.routes();
    }
    middlewares(){
        const publicPath = path.resolve(__dirname, '../uploads');
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/files', express.static(publicPath));        
        this.app.use(fileUpload({
            limits: {
              fileSize: 50 * 1024 * 1024 // límite de 50 MB
            },
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
          }));
    }
    routes() {
        // this.app.use(this.paths.users, userRouter);
        this.app.get("/hola-mundo", (req: Request, res: Response) => {
            return res.json("Hola mundo");
        });
        const contentI = new ContentInfrastructure();
        const contentApp =  new ContentApplication(contentI);
        const controller = new ContentController(contentApp);
        const router = new ContentRouter(controller);
        this.app.use(this.paths.content, router.router);
    }
    initialize() {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            server
                .listen(this.port || 8000)
                .on("listening", () => {
                    resolve(true);
                    console.log("Server started in port: " + this.port);
                })
                .on("error", (error: Error) => {
                    console.log("Server failed to start: ", error);
                    reject(true);
                });
        });
    }
}
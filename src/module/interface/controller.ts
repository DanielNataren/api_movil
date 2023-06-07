import { Request, Response } from "express";
import ContentApplication from "../application/user.application";
import { ContentData, upload } from "../domain/repository/content.repository";
import { UploadedFile } from "express-fileupload";
import { uploadArchive } from "../../helpers/validate_extensions";

export default class ContentController {
    constructor(
        private readonly app: ContentApplication
    ){
        this.create = this.create.bind(this);
        this.getBytype = this.getBytype.bind(this);
    }
    async create(req: Request, res: Response){
        try {
            const data: ContentData = req.body;
            if (!data) return res.status(200).json({msg: "No hay nada para agregar"});
            if (req.files && Object.keys(req.files).length > 0 && req.files.content){
                const file = req.files.content as UploadedFile;
                const fileData: any = await uploadArchive(file, data.type + "/");
                console.log(fileData);
                data.url = fileData.url;
                data.name = fileData.name;
                data.originalName = fileData.originalName;
                const content = await this.app.create(data);
                return res.json(content);
            }
            return res.status(400).json({
                msg: "Se necesita el contenido a subir"
            });
        } catch (error) {
            return res.status(400).json({
                msg: error.message
            });
        }
    }
    async getBytype(req: Request, res: Response){
        try {
            const type = req.params.type;
            const content = await this.app.getvideos(type);
            return res.json(content);
        } catch (error) {
            return res.status(400).json({
                msg: error.message
            });
        }
    }
}
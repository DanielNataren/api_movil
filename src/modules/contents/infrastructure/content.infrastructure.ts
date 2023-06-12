import { Repository } from "typeorm";
import ContentEntity from "../domain/entity/content.entity";
import ContentRepository, { ContentListResult, ContentResult, ContentdeleteResult } from "../domain/repository/content.repository";
import Content from "./models/content.model";
import { dataSource } from "../../../bootstrap/database.bootstrap";
import { err, ok } from "neverthrow";
import { IError } from "../../../core/exceptions/error.exception";

export default class ContentInfrastructure implements ContentRepository {
    private readonly model: Repository<Content>;
    constructor(){
        this.model = dataSource.getRepository(Content);
    }
    async deleteContent(publicId: string): Promise<ContentdeleteResult> {
        try {
            const content = await this.model.findOne({where: {publicId}});
            if (!content){
                const resultErr = new IError('No exixte contenido con ese publicId');
                return err(resultErr);
            }
            await this.model.delete({publicId});
            return ok(content.type + " eliminado");
        } catch (error) {
            const resultErr = new IError('Error al momento de eliminar: ' + error.message, 500);
            return err(resultErr);
        }
    }
    async create(data: ContentEntity): Promise<ContentResult> {
        try {
            const content = this.model.create({...data.properties});
            await this.model.save(content);
            return ok(content);
        } catch (error) {
            const resultErr = new IError('Error al momento de salvar: ' + error.message, 500);
            return err(resultErr);
        }
    }
    async getContent(type: string): Promise<ContentListResult> {
        try {
            const content = await this.model.find({where: {type: type}, relations:{user: true}});
            content.map(item => {
                delete item.user.content;
                delete item.user.password;
                delete item.user.isActive;
                delete item.user.name;
                delete item.user.last_name;
                delete item.user.createdAt;
              });
            return ok(content);
        } catch (error) {
            const resultErr = new IError('Error al momento de consultar: ' + error.message, 500);
            return err(resultErr);
        }
    }

}
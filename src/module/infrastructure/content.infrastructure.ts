import { Repository } from "typeorm";
import ContentEntity from "../domain/entity/content.entity";
import ContentRepository, { ContentListResult, ContentResult } from "../domain/repository/content.repository";
import Content from "./models/content.model";
import { dataSource } from "../../bootstrap/database.bootstrap";
import { err, ok } from "neverthrow";
import { IError } from "../../core/exceptions/error.exception";

export default class ContentInfrastructure implements ContentRepository {
    private readonly model: Repository<Content>;
    constructor(){
        this.model = dataSource.getRepository(Content);
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
    async getVideos(type: string): Promise<ContentListResult> {
        try {
            const content = await this.model.findBy({type: type});
            return ok(content);
        } catch (error) {
            const resultErr = new IError('Error al momento de consultar: ' + error.message, 500);
            return err(resultErr);
        }
    }

}
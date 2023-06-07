import { InternalServerErrorException } from "../../core/exceptions/internalserver.exception";
import ContentEntity from "../domain/entity/content.entity";
import ContentRepository, { ContentData } from "../domain/repository/content.repository";

export default class ContentApplication {
    constructor(
        private readonly repository: ContentRepository
    ){}
    async create(data: ContentData){
        const content = new ContentEntity({...data});
        const contentResult = await this.repository.create(content);
        if(contentResult.isErr())
            throw new InternalServerErrorException(contentResult.error.message);
        return contentResult.value;
    }
    async getvideos(type: string){
        const contentResult = await this.repository.getVideos(type);
        if(contentResult.isErr())
            throw new InternalServerErrorException(contentResult.error.message);
        return contentResult.value;
    }
}
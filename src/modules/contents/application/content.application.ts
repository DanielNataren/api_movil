import { InternalServerErrorException } from "../../../core/exceptions/internalserver.exception";
import UserInfrastructure from "../../users/infrastructure/user.infrastructure";
import ContentEntity from "../domain/entity/content.entity";
import ContentRepository, { ContentData } from "../domain/repository/content.repository";

export default class ContentApplication {
    constructor(
        private readonly repository: ContentRepository
    ){}
    async delete(publicId: string){
        const contentResult = await this.repository.deleteContent(publicId);
        if(contentResult.isErr())
            throw new InternalServerErrorException(contentResult.error.message);
        return contentResult.value;
    }
    async create(data: ContentData){
        const userResult = await UserInfrastructure.getById(data.idUser);
        if (userResult.isErr())
            throw new InternalServerErrorException(userResult.error.message);
        data.user = userResult.value;
        delete data.idUser;
        const content = new ContentEntity({...data});
        const contentResult = await this.repository.create(content);
        if(contentResult.isErr())
            throw new InternalServerErrorException(contentResult.error.message);
        return contentResult.value;
    }
    async getvideos(type: string){
        const contentResult = await this.repository.getContent(type);
        if(contentResult.isErr())
            throw new InternalServerErrorException(contentResult.error.message);
        return contentResult.value;
    }
}
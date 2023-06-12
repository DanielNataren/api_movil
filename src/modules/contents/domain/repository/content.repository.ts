import { Err, Result } from "neverthrow";
import ContentEntity from "../entity/content.entity";
import Content from "../../infrastructure/models/content.model";
import User from "../../../users/infrastructure/models/user.model";


export interface ContentData {
    id?: number;
    originalName: string;
    name: string;
    caption: string;
    likes: number;
    views: number;
    url: string;
    type: string;
    publicId: string;
    user: User;
    idUser: number;
}

export interface upload {
    originalName: string;
    name: string;
    url: string;
    type: string;
    publicId: string;
}

export default interface ContentRepository {
    create(data: ContentEntity): Promise<ContentResult>;
    getContent(type: string): Promise<ContentListResult>;
    deleteContent(publicId: string): Promise<ContentdeleteResult>;
}

export type ContentResult = Result<Content, Error>;
export type ContentListResult = Result<Content[], Error>;
export type ContentdeleteResult = Result<string, Error>;
import { Err, Result } from "neverthrow";
import ContentEntity from "../entity/content.entity";
import Content from "../../infrastructure/models/content.model";


export interface ContentData {
    id?: number;
    originalName: string;
    name: string;
    caption: string;
    likes: number;
    views: number;
    url: string;
    type: string;
}

export interface upload {
    originalName: string;
    name: string;
    url: string;
}

export default interface ContentRepository {
    create(data: ContentEntity): Promise<ContentResult>;
    getVideos(type: string): Promise<ContentListResult>;
}

export type ContentResult = Result<Content, Error>;
export type ContentListResult = Result<Content[], Error>;
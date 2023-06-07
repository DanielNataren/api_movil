import { ContentData } from "../repository/content.repository";


export default class ContentEntity {
    private id?: number = 0; 
    private originalName: string; 
    private name: string;
    private caption: string;
    private likes: number;
    private views: number;
    private url: string;
    private type: string;

    constructor(contentData: ContentData){
        if (contentData.id) this.id = contentData.id;
        this.originalName = contentData.originalName;
        this.name = contentData.name;
        this.caption = contentData.caption;
        this.likes = contentData.likes;
        this.views = contentData.views;
        this.url = contentData.url;
        this.type = contentData.type;
    }

    get properties(){
        return {
            id: this.id,
            originalName: this.originalName,
            name: this.name,
            caption: this. caption,
            likes: this.likes,
            views: this.views,
            url: this.url,
            type: this.type
        
        }
    }

}
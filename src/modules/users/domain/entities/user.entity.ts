import Content from "../../../contents/infrastructure/models/content.model";
import { UserData } from "../repositories/user.repository";

export default class UserEntity {
    private id? : number = 0;
    private username?: string;
    private name?: string;
    private last_name?: string;
    private password?: string;
    private readonly createdAt?: Date;
    private isActive?: boolean;
    private content?: Content[];

    constructor(userData: UserData){
        this.username = userData.username;
        this.password = userData.password;
        this.name = userData.name;
        this.last_name = userData.last_name;
        this.createdAt = new Date();
        this.isActive = true;
        if (userData.id) this.id = userData.id;
        if (userData.content) this.content = userData.content;
    }
    properties() {
        
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            name: this.name,
            last_name: this.last_name,
            createdAt: this.createdAt,
            isActive: this.isActive,
            content: this.content
        };
    }
}
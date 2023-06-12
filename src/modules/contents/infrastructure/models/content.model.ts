import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../../../users/infrastructure/models/user.model";

@Entity("contents")
export default class Content {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("text")
    originalName: string;
    @Column("text")
    name: string;
    @Column("text")
    caption:string;
    @Column("int")
    likes: number;
    @Column("int")
    views: number;
    @Column("text")
    url: string;
    @Column("text")
    type: string;    
    @Column("text")
    publicId: string;    
    @ManyToOne(()=>User, (user: User) => user.content)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id'
    })
    user: User;
}
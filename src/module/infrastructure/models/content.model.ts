import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
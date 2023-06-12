import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Content from "../../../contents/infrastructure/models/content.model";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("text")
    username: string;
    @Column("text")
    password: string;
    @Column("text")
    name:string;
    @Column("text")
    last_name: string;
    @CreateDateColumn()
    createdAt: Date;
    @Column("bool", {default: true})
    isActive: boolean;
    @OneToMany(() => Content, (content: Content) => content.user, {cascade: true, eager: true})
    content: Content[];
    @Column("text", {nullable: true})
    image: string = "";
}
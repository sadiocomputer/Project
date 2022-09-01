import { BaseEntity, Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Double, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Client } from "./Client";
import { User } from "./User";
@Entity()
export class Emprunt extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, type: "float" })
    montantemprunt!: number;

    @ManyToOne(type => Client, { onDelete: 'CASCADE' })
    @JoinTable()
    client: Client;
    clientid: number;

    @Column()
    dateemprunt!: string;


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;
}
import { BaseEntity, Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Double, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Client } from "./Client";
import { User } from "./User";
@Entity()
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type!: string;

    @Column({ nullable: false, type: "float" })
    montant!: number;

    @Column()
    pdv!: string;
   
    @ManyToOne(type => Client, { onDelete: 'CASCADE' })
    @JoinTable()
    client: Client;
    clientid:number;

    @Column() 
    datetransaction:string

    @Column() 
    heuretransaction:string
   

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
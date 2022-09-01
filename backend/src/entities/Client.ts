import { BaseEntity, Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, Double, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Transaction } from "./Transaction";
@Entity()
export class Client extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nom!: string;


    @Column()
    prenom!: string;

    @Column({ nullable: false, type: "float" })
    solde!: number;

    @Column()
    pdv!: string;

    @Column()
    telephone!: string;

    @Column()
    adresse!: string;
    

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;
}
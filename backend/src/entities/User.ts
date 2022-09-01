import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nom!:string;

    @Column()
    prenom!: string;


    @Column()
    identifiant!: string;

    @Column()
    password!: string;


    @Column()
    role!: string;

    @Column()
    isActive!: boolean;
   
   

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;
}
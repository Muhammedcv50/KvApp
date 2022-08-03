import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";

@Entity("address")
    export class Address extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        
        @Column({ nullable: false })
        public addressLine1: string;

        @Column({ nullable: false })
        public addressLine2: string;

        @Column({ nullable: false })
        public city: string;

        @Column({ nullable: false })
        public state: string;

        @Column({ nullable: false })
        public country: string;

        @Column({ nullable: false })
        public zip: string;

    
}
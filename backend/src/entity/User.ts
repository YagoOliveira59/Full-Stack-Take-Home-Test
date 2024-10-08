import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string

    @Column()
    city!: string

    @Column()
    country!: string

    @Column()
    favorite_sport!: string
}
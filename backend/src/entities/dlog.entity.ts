import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dlog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    deviceId: number;

    @Column({ nullable: false })
    status: number;

    @Column({ nullable: false })
    logTime: Date;
}
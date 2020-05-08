import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Device {
    @PrimaryGeneratedColumn()
    deviceId: number;

    @Column({ nullable: false })
    phoneNumber: string;

    @Column({ nullable: false })
    info: string;

    @Column({ nullable: false })
    status: number;

    @Column({ nullable: false })
    lastLogTime: Date;
}
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Invitation {
    @Column({ primary: true, generated: true })
    id: number;
    @Column({ nullable: false })
    user_id: string;
    @Column({ nullable: false })
    name: string;
    @Column({ type: 'timestamp', nullable: false })
    entry_date: Date;
    @Column({ type: 'timestamp', nullable: false })
    expiration: Date;
    @CreateDateColumn()
    created_at: Date;
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;
    @CreateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.invitations)
    @JoinColumn({ name: "user_id" })
    user: User;
}
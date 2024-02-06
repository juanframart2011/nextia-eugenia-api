import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany } from 'typeorm'

@Entity()
export class Role {
    @Column({primary:true, generated:true})
    id:number;
    @Column({unique:true,nullable:false})
    name:string;
    @Column({ type: 'text' })
    description:string;
    @CreateDateColumn()
    created_at:Date;
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;
    @CreateDateColumn()
    updated_at:Date;

    @OneToMany(() => User, user => user.role)
    users: User[];
}
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { User } from './user.entity';

@Entity()
export class UserRecovery {
    @Column({primary:true, generated:true})
    id:number;
    @Column({default:1,nullable:false})
    statu:number;
    @Column({nullable:false})
    user_id:number;
    @Column({nullable:false})
    token:string;
    @CreateDateColumn()
    created_at:Date;
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;
    @CreateDateColumn()
    updated_at:Date;
}
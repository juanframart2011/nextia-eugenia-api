import { Role } from './role.entity';
import { Column, CreateDateColumn, DeleteDateColumn, ManyToOne, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { UserRecovery } from './user-recovery.entity';

@Entity()
export class User {
    @Column({primary:true, generated:true})
    id:number;
    @Column({default:1,nullable:false})
    rol_id:number;
    @Column({nullable:false})
    name:string;
    @Column()
    last_name:string;
    @Column({unique:true,nullable:false})
    email:string;
    @Column({nullable:false})
    password:string;
    @Column({nullable:false})
    no_department:string;
    @CreateDateColumn()
    created_at:Date;
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;
    @CreateDateColumn()
    updated_at:Date;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: "rol_id" })
    role: Role;
}
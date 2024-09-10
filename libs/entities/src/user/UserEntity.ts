import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Major } from './Major';
import { Role } from './Role';

@Entity("users")
export class User {
  @PrimaryColumn('varchar', {
    length: 10
  })
  id: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Major })
  major!: Major;

  @Column({ type: 'enum', enum: Role })
  role!: Role;
    
  // @Column()
  // jobs: Jobs[];

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ default: true })
  isActive: boolean;
}

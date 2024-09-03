import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Major } from './Major';
import { Role } from './Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Major })
  major: Major;

  @Column({ type: 'enum', enum: Role })
  role: Role;
    
  // @Column()
  // jobs: Jobs[];

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ default: true })
  isActive: boolean;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public first_name: string;

  @Column({ type: 'varchar', length: 120 })
  public last_name: string;

  @Column({ type: 'varchar', length: 120, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  public email: string;

  @Column({ type: 'boolean', default: true })
  public isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}

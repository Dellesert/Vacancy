import { ApplicantEntity } from 'src/applicant/entities/applicant.entity';
import { UserEntity } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class ResumeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { default: new Date() })
  date: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  salary: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, user => user.resumes)
  user: UserEntity;

  @ManyToOne(() => ApplicantEntity, applicant => applicant.resume)
  applicant: ApplicantEntity;

}

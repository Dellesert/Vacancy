import { FavoriteEntity } from "src/favorite/entities/favorite.entity";
import { ResumeEntity } from "src/resume/resume.entity";
import { UserEntity } from "src/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ApplicantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { default: new Date() })
  date: Date;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  secondname: string;

  @Column()
  phone: string;

  @Column()
  userId: number;

  @OneToMany(() => ApplicantEntity, resume => resume.userId)
  resume: ApplicantEntity;

  @OneToMany(() => FavoriteEntity, favorite => favorite.applicant)
  response: FavoriteEntity;

  @ManyToOne(() => UserEntity, user => user.applicant)
  user: UserEntity

  @ManyToOne(() => ResumeEntity, resume => resume.applicant)
  resumes: ResumeEntity
}

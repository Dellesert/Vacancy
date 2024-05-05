import { ApplicantEntity } from "src/applicant/entities/applicant.entity";
import { UserEntity } from "src/users/users.entity";
import { VacancyEntity } from "src/vacancy/vacancy.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { default: new Date() })
  date: Date;

  @Column()
  userId: number;

  @Column()
  vacancyId: number;
  

  @ManyToOne(() => UserEntity, user => user.favorites)
  user: UserEntity;

  @ManyToOne(() => ApplicantEntity, applicant => applicant.userId)
  applicant: UserEntity;

  @ManyToOne(() => VacancyEntity, vacancy => vacancy.favorites)
  vacancy: VacancyEntity;
  

  
}


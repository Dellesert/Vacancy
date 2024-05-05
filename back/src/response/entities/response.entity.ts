import { UserEntity } from "src/users/users.entity";
import { VacancyEntity } from "src/vacancy/vacancy.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["userId", "vacancyId"])

export class ResponseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { default: new Date() })
  date: Date;

  @Column()
  userId: number;

  @Column()
  vacancyId: number;

  @ManyToOne(() => UserEntity, user => user.response)
  user: UserEntity;

  @ManyToOne(() => VacancyEntity, vacancy => vacancy.responses)
  vacancy: VacancyEntity;


}

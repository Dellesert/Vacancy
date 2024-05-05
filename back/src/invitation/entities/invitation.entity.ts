import { UserEntity } from "src/users/users.entity";
import { VacancyEntity } from "src/vacancy/vacancy.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["userId", "resumeId"])

export class InvitationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { default: new Date() })
  date: Date;

  @Column()
  userId: number;

  @Column()
  resumeId: number;

  @ManyToOne(() => UserEntity, user => user.response)
  user: UserEntity;

  @ManyToOne(() => VacancyEntity, vacancy => vacancy.responses)
  vacancy: VacancyEntity;

}

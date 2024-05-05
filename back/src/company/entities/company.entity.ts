import { UserEntity } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { default: new Date() })
  date: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  userId: number;

  @OneToMany(() => CompanyEntity, vacancies => vacancies.userId)
  vacancies: CompanyEntity;

  @ManyToOne(() => UserEntity, user => user.company)
  user: UserEntity

  [Symbol.iterator]() {
    let index = 0;
    const vacanciesArray = Array.from(this.vacancies);
    return {
      next: () => {
        return {
          value: vacanciesArray[index++],
          done: index > vacanciesArray.length
        };
      }
    };
  }

}

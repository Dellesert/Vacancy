import { CompanyEntity } from 'src/company/entities/company.entity';
import { FavoriteEntity } from 'src/favorite/entities/favorite.entity';
import { ResponseEntity } from 'src/response/entities/response.entity';
import { UserEntity } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class VacancyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date', { default: new Date() })
  date: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  salary: number;

  @Column()
  userId: number;

  @Column()
  companyId: number;

  @ManyToOne(() => UserEntity, user => user.vacancies)
  user: UserEntity;

  @ManyToOne(() => CompanyEntity, company => company.vacancies)
  company: CompanyEntity;

  @OneToMany(() => FavoriteEntity, favorite => favorite.vacancy)
  favorites: FavoriteEntity[];

  @OneToMany(() => ResponseEntity, response => response.vacancy)
  responses: ResponseEntity[];


  favoriteCount: number;

}

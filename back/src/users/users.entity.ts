import { VacancyEntity } from "src/vacancy/vacancy.entity";
import { ResumeEntity } from "src/resume/resume.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CompanyEntity } from "src/company/entities/company.entity";
import { FavoriteEntity } from "src/favorite/entities/favorite.entity";
import { ApplicantEntity } from "src/applicant/entities/applicant.entity";
import { ResponseEntity } from "src/response/entities/response.entity";

@Unique(['name'])
@Entity({ name: 'Users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column({unique: true})
    userName: string

    @Column()
    password: string 

    @Column('boolean', { default: false })
    isAdmin: boolean = false

  

    @OneToMany(() => VacancyEntity, (vacancy) => vacancy.userId)
    vacancies: VacancyEntity[]

    @OneToMany(() => ResumeEntity, (resume) => resume.userId)
    resumes: ResumeEntity[]

    @OneToMany(() => CompanyEntity, (company) => company.user)
    company: CompanyEntity[]

    @OneToMany(() => ApplicantEntity, (applicant) => applicant.userId)
    applicant: ApplicantEntity[]

    @OneToMany(() => FavoriteEntity, (favorite) => favorite.userId)
    favorites: FavoriteEntity[]

    @OneToMany(() => ResponseEntity, (response) => response.userId)
    response: ResponseEntity[]

}

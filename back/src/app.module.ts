import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { ResumeModule } from './resume/resume.module';
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { ApplicantModule } from './applicant/applicant.module';
import { ResponseModule } from './response/response.module';
import { FavoriteModule } from './favorite/favorite.module';
import { InvitationModule } from './invitation/invitation.module';
import { AuthModule } from './auth/auth.module';




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: ['dist/**/*.entity.{ts,js}'],


        synchronize: true,
        autoLoadEntities: true,
        logging: true
      })
    }),
    UsersModule,
    VacancyModule,
    ResumeModule,
    CompanyModule,
    ApplicantModule,
    ResponseModule,
    FavoriteModule,
    InvitationModule,
    AuthModule,
        


  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

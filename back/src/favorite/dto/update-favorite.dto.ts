import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
    date: Date
    userId: number
    vacancyId: number
}

import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';
import { IsString, IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @Length(1, 250)
  @IsString()
  name: string;
  @IsString()
  @Length(1, 1500)
  description: string;
  @IsUrl()
  image: string;
  items: Wish[];
  owner: User;
}

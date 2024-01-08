import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

export class CreateOfferDto {
  user: User;
  amount: number;
  hidden: boolean;
  item: Wish;
}

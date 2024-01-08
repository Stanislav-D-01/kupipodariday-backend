import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsUrl, Length } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 250 })
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({ scale: 2 })
  price: number;

  @Column({ default: 0 })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column({ type: 'integer', default: 0 })
  copied: number;
}

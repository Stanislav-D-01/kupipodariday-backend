import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.offers, { eager: true })
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({ scale: 2 })
  amount: number;

  @Column({ default: false })
  hidden: boolean;
}

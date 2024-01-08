import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  async create(user, createWishDto: CreateWishDto) {
    const wish = await this.wishesRepository.create({
      ...createWishDto,
      owner: user,
    });
    delete wish.owner.password;
    return await this.wishesRepository.save(wish);
  }

  async findByUser(user) {
    const wish = await this.wishesRepository.find({
      where: { owner: { id: user.id } },
      relations: { owner: true, offers: true },
    });
    wish.forEach((el) => {
      delete el.owner.password;
    });
    return wish;
  }

  async findLast() {
    const wish = await this.wishesRepository.find({
      order: { updatedAt: 'DESC' },
      take: 40,
      relations: { owner: true, offers: true },
    });
    wish.forEach((el) => {
      delete el.owner.password;
    });
    return wish;
  }

  async findTop() {
    const wish = await this.wishesRepository.find({
      order: { raised: 'DESC' },
      take: 20,
      relations: { owner: true },
    });
    wish.forEach((el) => {
      delete el.owner.password;
    });
    return wish;
  }

  async findById(id: number) {
    const wish = await this.wishesRepository.findOne({
      where: {
        id: id,
      },
      relations: { owner: true, offers: true },
    });
    delete wish.owner.password;
    wish.offers.forEach((el) => {
      delete el.user.password;
    });
    return wish;
  }

  async findManyById(id: number[]) {
    const wish = await Promise.all(
      id.map(async (el) => {
        return await this.wishesRepository.findOneBy({ id: el });
      }),
    );
    wish.forEach((el) => {
      delete el.owner.password;
    });
    return wish;
  }

  async deleteById(id: number) {
    return await this.wishesRepository.delete({ id: id });
  }

  async copy(idWish: number, user: User) {
    const wish = await this.wishesRepository.findOneBy({ id: idWish });
    const newWish = this.wishesRepository.create({ ...wish, owner: user });
    return this.wishesRepository.save(newWish);
  }

  async update(id: number, updateWishDto: UpdateWishDto) {
    return await this.wishesRepository.update({ id: id }, updateWishDto);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

import { JwtGuard } from '../auth/jwt.guard';
import { WishesService } from '../wishes/wishes.service';
import { Response } from '@nestjs/common';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly wishService: WishesService,
  ) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto, @Req() req) {
    const wish = await this.wishService.findById(req.body.itemId);
    const raised = { raised: wish.raised + createOfferDto.amount };
    if (raised.raised > wish.price) {
      throw new HttpException(
        'Сумма собранных средств превышает стоимость подарка',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.wishService.update(wish.id, raised);
    return await this.offersService.create(createOfferDto, req.user, wish);
  }
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.offersService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.offersService.findOne(id);
  }
}

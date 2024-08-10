import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardStatusDto } from './dto/update-card-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardService.create(createCardDto);
  }

  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return await this.cardService.findByUserId(userId);
  }

  @Get(':id')
  async findUnique(@Param('id') id: string) {
    return await this.cardService.findUnique(id);
  }

  @Patch(':id')
  async updateCardStatus(
    @Param('id') id: string,
    @Body() updateCardStatusDto: UpdateCardStatusDto,
  ) {
    return await this.cardService.updateCardStatus(id, updateCardStatusDto);
  }
}

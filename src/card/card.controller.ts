import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardStatusDto } from './dto/update-card-status.dto';
import { PaginationDto } from '../common/dto';

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

  @Get('/user/:userId/paginated')
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Página atual (padrão: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Registros por página (padrão: 20, máximo: 100)' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Busca por nome do cliente' })
  async findByUserIdPaginated(
    @Param('userId') userId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return await this.cardService.findByUserIdPaginated(userId, paginationDto);
  }

  @Get('/user/:userId/period')
  async findByPeriod(
    @Param('userId') userId: string,
    @Query('initialDate') initialDate: Date,
    @Query('finalDate') finalDate: Date,
  ) {
    return await this.cardService.findByPeriod(userId, initialDate, finalDate);
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

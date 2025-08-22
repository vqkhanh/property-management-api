import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private readonly service: SpacesService) {}

  @Post()
  create(@Body() dto: CreateSpaceDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'building', required: false })
  findAll(@Query('building') building?: string) {
    return this.service.findAll({ building });
  }

  @Get('tree')
  @ApiQuery({ name: 'building', required: false })
  tree(@Query('building') building?: string) {
    return this.service.getTree(building);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSpaceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

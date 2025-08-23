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
import { QuerySpaceDto } from './dto/query-space.dto';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private readonly service: SpacesService) {}

  @Post()
  create(@Body() dto: CreateSpaceDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiQuery({
    name: 'building',
    required: false,
    description: 'Filter by building name',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Search by displayName or refCode',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(
    @Query('building') building?: string,
    @Query('q') q?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.service.findAll({ building, q, page, limit });
  }

  @Get('tree')
  @ApiQuery({ name: 'building', required: false })
  tree(@Query('building') building?: string) {
    return this.service.getTree(building);
  }

  @Get('search')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'building', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, enum: ['ASC', 'DESC'] })
  findAllPaginated(@Query() query: QuerySpaceDto) {
    return this.service.findAllPaginated(query);
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

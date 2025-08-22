import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {}

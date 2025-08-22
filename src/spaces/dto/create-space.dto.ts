import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty({ example: 'A' })
  @IsString()
  @Length(1, 50)
  building: string;

  @ApiProperty({ example: 'Lobby Level 1' })
  @IsString()
  @Length(1, 200)
  displayName: string;

  @ApiProperty({ example: 'A-01-Lobby' })
  @IsString()
  @Length(1, 100)
  refCode: string;

  @ApiPropertyOptional({ example: 80.62, description: 'm²' })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  floorArea?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}

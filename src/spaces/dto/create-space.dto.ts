import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty({ example: 'A', description: 'Building identifier' })
  @IsString()
  @Length(1, 50)
  building: string;

  @ApiProperty({ example: 'Building A', description: 'Display name' })
  @IsString()
  @Length(1, 200)
  displayName: string;

  @ApiProperty({ example: 'A', description: 'Reference code' })
  @IsString()
  @Length(1, 100)
  refCode: string;

  @ApiProperty({ example: 1000, description: 'Floor area in m2' })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  floorArea?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}

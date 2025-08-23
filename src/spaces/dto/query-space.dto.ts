import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QuerySpaceDto {
  @IsOptional()
  @IsString()
  q?: string; // search theo displayName

  @IsOptional()
  @IsString()
  building?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  sort: 'ASC' | 'DESC' = 'ASC';
}

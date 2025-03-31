import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({ description: 'Referrer ID if applicable' })
  @IsOptional()
  @IsString()
  referrerId?: string;
}

export class UpdateUserDto {}

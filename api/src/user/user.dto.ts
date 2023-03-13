import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserCreateInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastname: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;
}

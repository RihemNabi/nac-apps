/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;
}

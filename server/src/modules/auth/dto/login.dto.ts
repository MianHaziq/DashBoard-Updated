import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'haziq@example.com' })
  @IsEmail()
  email!: string;
  @ApiProperty({ example: 'pasword123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

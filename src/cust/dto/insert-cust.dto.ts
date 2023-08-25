import { IsNotEmpty, IsString } from 'class-validator';

export class InsertCustDTO {
  @IsNotEmpty()
  @IsString()
  path: string;
}

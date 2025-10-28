import { IsInt, IsString, Min } from 'class-validator';

export class addCartDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @Min(1)
  productId: number;

  @IsString()
  productName: string;
}

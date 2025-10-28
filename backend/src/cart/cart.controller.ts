import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { addCartDto } from './dto/addCart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addItemInCart(@Body() dto: addCartDto) {
    return this.cartService.addToCart(dto);
  }
}

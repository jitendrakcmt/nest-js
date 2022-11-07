import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateResaturantDto } from './dto/create-restaurant.dto';
import { UpdateResaturantDto } from './dto/update.restaurant.dto';
import { RestaurantsService } from './restaurant.service';
import { Restaurant } from './schema/restaurant.schama';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    console.log('dsdsd');
    return this.restaurantService.findAll();
  }
  //   findAll(@Req() request: Request): string {
  //     return 'This action returns all cats';
  //   }
  @Post()
  async createResaturant(
    @Body() restaurants: CreateResaturantDto,
  ): Promise<Restaurant> {
    const res = await this.restaurantService.create(restaurants);
    return res;
  }

  @Get(':id')
  async getRestaurant(@Param('id') id: string): Promise<Restaurant> {
    console.log('Jitendra', id);
    return this.restaurantService.findByID(id);
  }

  @Put(':id')
  async updateRestaurantById(
    @Param('id') id: string,
    @Body()
    resaturant: UpdateResaturantDto,
  ): Promise<Restaurant> {
    // const res = await this.restaurantService.findByID(id);
    // if(res.user.toString() !== user)
    const data = await this.restaurantService.updateById(id, resaturant);
    return data;
  }

  @Delete(':id')
  //   @UseGuards(AuthGuard())
  async deleteRestaurant(
    @Param('id') id: string,
  ): Promise<{ deleted: boolean }> {
    // const res = await this.restaurantService.findByID(id);
    const restaurant = await this.restaurantService.deleteRestaurantById(id);
    if (restaurant) {
      return {
        deleted: true,
      };
    }
  }
}

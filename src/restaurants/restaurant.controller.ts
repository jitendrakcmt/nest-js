import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateResaturantDto } from './dto/create.restaurant.dto';
import { UpdateResaturantDto } from './dto/update.restaurant.dto';
import { RestaurantsService } from './restaurant.service';
import { Restaurant } from './schema/restaurant.schama';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Post()
  async createResaturant(
    @Body() restaurants: CreateResaturantDto,
  ): Promise<Restaurant> {
    const res = await this.restaurantService.create(restaurants);
    return res;
  }

  @Put(':id')
  async updateRestaurantById(
    @Body() @Param('id') id: string,
    resaturant: UpdateResaturantDto,
  ): Promise<Restaurant> {
    const res = await this.restaurantService.findByID(id);
    // if(res.user.toString() !== user)
    const data = await this.restaurantService.updateById(id, resaturant);
    return data;
  }

  @Delete()
  async deleteRestaurant(
    @Param('id') id: string,
  ): Promise<{ deleted: boolean }> {
    const data = await this.restaurantService.deleteRestaurantById(id);
    return data;
  }
}

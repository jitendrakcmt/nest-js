import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Restaurant } from './schema/restaurant.schama';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaturantModel: mongoose.Model<Restaurant>,
  ) {}

  //Get all restaurants
  async findAll(): Promise<Restaurant[]> {
    const restaurnt = await this.restaturantModel.find();
    return restaurnt;
  }

  // Add New restaurant
  async create(restaurant: Restaurant): Promise<Restaurant> {
    const res = await this.restaturantModel.create(restaurant);
    return res;
  }

  async findByID(id: string): Promise<Restaurant> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('In valid resaturant id');
    }
    const data = await this.restaturantModel.findById(id);
    if (!data) {
      throw new NotFoundException('No Record Found');
    }
    return data;
  }
  //Update Restaurant by ID =>PUT
  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
    const data = await this.restaturantModel.findByIdAndUpdate(id, restaurant, {
      new: true,
      runValidators: true,
    });
    return data;
  }

  async deleteRestaurantById(id: string): Promise<Restaurant> {
    const data = await this.restaturantModel.findByIdAndDelete(id);
    return data;
  }
}

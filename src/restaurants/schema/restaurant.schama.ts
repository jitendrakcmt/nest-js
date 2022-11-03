import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export enum Category {
  FAST_FOOD = 'Fast Food',
  CAFE = 'Cafe',
  FINEDINING = 'Fine Dining',
}

@Schema()
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  category: Category;

  @Prop()
  images?: [];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

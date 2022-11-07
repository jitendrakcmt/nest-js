import { Category } from '../schema/restaurant.schama';

export class CreateResaturantDto {
  readonly name: string;

  description: string;

  readonly email: string;

  phone: string;

  address: string;

  readonly category: Category;

  images?: [];
}

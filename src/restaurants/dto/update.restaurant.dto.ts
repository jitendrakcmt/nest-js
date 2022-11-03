import { Category } from '../schema/restaurant.schama';

export class UpdateResaturantDto {
  readonly name: string;

  description: string;

  readonly email: string;

  phone: string;

  address: string;

  readonly category: Category;

  images?: [];
}

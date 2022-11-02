import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Model } from 'mongoose';

import Utils from 'src/utils/util';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtservice: JwtService,
  ) {}

  //Register new User
  async signUp(SignUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, phone, password, role } = SignUpDto;
    const isEmailExists = await this.userModel.findOne({ email });
    const hashPassword = await bcrypt.hash(password, 10);

    if (isEmailExists) {
      throw new ConflictException('Email already exists');
    } else {
      const user = await this.userModel.create({
        name,
        email,
        phone,
        password: hashPassword,
        role,
      });
      const token = await Utils.assignJwtToken(user._id, this.jwtservice);
      //return user;
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: token,
      };
      return data;
    }
  }

  async login(LoginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = LoginDto;
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid user name or password');
    }
    const checkPassword = bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('Invalid user name or password');
    }
    const token = await Utils.assignJwtToken(user._id, this.jwtservice);
    // return user;
    const data = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: token,
    };
    return data;
  }
}

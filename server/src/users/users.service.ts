import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async signUp(signupDto: Partial<CreateUserDto>): Promise<void> {
    const user = this.usersRepository.create(signupDto);

    user.password = await this.getHashedPassword(user.password);

    await this.saveUser(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);

    user.password = await this.getHashedPassword(user.password);

    await this.saveUser(user);

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.getUserById(id);

    return this.usersRepository.remove(user);
  }

  async updateUser(id: string, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);

    Object.assign(user, updateUserDto);

    await this.saveUser(user);

    return user;
  }

  private async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
  }

  private async saveUser(user: User): Promise<void> {
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      const sqliteDuplicateError = 'SQLITE_CONSTRAINT';
      const postgresDuplicateError = '23505';

      if ([sqliteDuplicateError, postgresDuplicateError].includes(error.code)) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,private readonly mailerService: MailerService) {}

  public sendMail(): void {
    this
      .mailerService
      .sendMail({
        to: 'ines.khelifi.1@esprit.tn', // list of receivers
        from: 'ali.obba@esprit.tn', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {})
      .catch(() => {});
  }

  // CREATE user
  async addUser(createUserDTO: UserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  // READ user
  async getUser(userID): Promise<User> {
    const usr = await this.userModel.findById(userID).exec();
    return usr;
  }

  // UPDATE user details
  async updateUser(userID, data): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userID, data, {
      new: true,
    });
    return updatedUser;
  }

  // DELETE user
  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    return deletedUser;
  }

  // GET ALL users
  async getAllUser(): Promise<User[]> {
    const usrs = await this.userModel.find().exec();
    return usrs;
  }

  // For JWT checking
  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email }, '+password');
  }

}

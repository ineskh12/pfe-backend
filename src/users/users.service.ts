import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserDto } from './dto/user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as Speakeasy from 'speakeasy';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  public sendMail(): void {
    this.mailerService
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

  // Take a secret code with 3600 sec before it dead
  secretForgotPassword = (email: string) =>
    new Promise((resolve, reject) =>
      this.userModel
        .findOne({ email: email })
        .exec()
        .then(async (user) => {
          if (user) {
            var secret = Speakeasy.generateSecret({ length: 20 });
            var sec = Speakeasy.time.length;
            console.log(sec);
            const token = Speakeasy.totp({
              secret: secret.base32,
              encoding: 'base32',
              step: 3600,
              digits: 6,
            });
            console.log('ici : ' + token);

            user.secretcode = secret.base32;

            return user
              .save()
              .then(async () => {
                resolve(user);
                await this.mailerService
                  .sendMail({
                    to: user.email, // list of receivers
                    from: 'ines.khelifi.1@esprit.tn', // sender address
                    subject: 'Votre Code de vérification est : ' + token + ' ✔', // Subject line
                    text:
                      'Bonjour ' +
                      user.first_name +
                      ' ' +
                      user.last_name +
                      ' code de vérification : ' +
                      token, // plaintext body
                  })
                  .then(() => console.log('e-mail sent'))
                  .catch(() => console.log('e-mail Error'));
              })
              .catch((e) => reject(e.message));
          }
          return reject('E-mail inexistant !!');
        })
        .catch((e) => reject(e.message)),
    );

  // Take a secret code with 3600 sec before it dead
  async validateForgotPassword(email: string, token: string) {
    return await this.userModel
      .findOne({ email: email })
      .exec()
      .then(async (user) => {
        console.log(user);

        if (user) {
          const valid = Speakeasy.totp.verify({
            secret: user.secretcode,
            encoding: 'base32',
            token: token,
            digits: 6,
            step: 3600,
            window: 0,
          });
          return Promise.resolve(valid);
        }
        return Promise.reject('E-mail inexistant !!');
      })
      .catch((e) => Promise.reject(e.message));
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

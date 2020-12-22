import { TemplatesService } from './templates/templates.service';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { NeconfigModule } from 'neconfig';
import { TemplatesModule } from './templates/templates.module';
import { ItemsService } from './items/items.service';
import { GridsService } from './grids/grids.service';
import { GridsModule } from './grids/grids.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule, AuthModule,
    TemplatesModule,
    GridsModule,
    ItemsModule,
    NeconfigModule.register({
      readers: [
        { name: 'env', file: path.resolve(process.cwd(), '.env') }
      ]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false

      }),
      inject: [ConfigService],
    }),
   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

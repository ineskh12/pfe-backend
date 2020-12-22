import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSchema } from './schemas/template.schema';
import { GridSchema } from 'src/grids/schemas/grid.schema';
import { ItemSchema } from 'src/items/schemas/item.schema';
import { ItemsService } from 'src/items/items.service';
import { GridsService } from 'src/grids/grids.service';
import { UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Template', schema: TemplateSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{ name: 'Grid', schema: GridSchema }]),
     MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),

  ],
 
  controllers: [TemplatesController],
  providers:[TemplatesService,GridsService,ItemsService,UsersService]
})
export class TemplatesModule {}

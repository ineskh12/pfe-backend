
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './items.service';
import { ItemSchema } from './schemas/item.schema';
import { ItemsController } from './items.controller';




@Module({
   imports: [
  
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema}]),
  ], 
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}

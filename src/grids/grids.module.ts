import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GridsService } from './grids.service';
import { GridSchema } from './schemas/grid.schema';
import { GridsController } from './grids.controller';

@Module({
    imports: [
   
     MongooseModule.forFeature([{ name: 'Grid', schema: GridSchema}]),
   ], 
   controllers: [GridsController],
   providers: [GridsService],

  
 
 })
export class GridsModule {}

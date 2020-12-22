import { Injectable } from '@nestjs/common';
import { Item } from 'src/items/interfaces/item.interface';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Grid } from './interfaces/grid.interface';

@Injectable()
export class GridsService {
    constructor(
        @InjectModel('Grid') private readonly gridModel: Model<Grid>,
      ) {}
    
    
      async insertGrid(items:Item[]): Promise<Grid> {
        const addedGrid =  new this.gridModel({items});
    
        const result = await addedGrid.save();
        return result;
     }
    
      
}

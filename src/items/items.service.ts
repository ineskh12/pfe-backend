
import { Item } from './interfaces/item.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ItemsService {
    constructor(
        @InjectModel('Item') private readonly itemModel: Model<Item>,
      ) {}

  
      async insertItems(
        
      type: string,
       value: string,
       bold :boolean,
      italics :boolean,
       fontsize :number,
        x:number,
       y:number,
       h:number,
     w:number,
       widthimg :number,
      heightimg :number): Promise<Item> {
        const addedItem =  new this.itemModel({
        type,
        value,
        bold ,
       italics ,
       fontsize,
        x,
       y,
       h,
       w,
       widthimg ,
       heightimg });
        const result = await addedItem.save();
        return result;
     }
    
      


}

import { Document } from 'mongoose';
import { Item } from 'src/items/interfaces/item.interface';

export interface Grid extends Document {
    readonly items:Item[],
   
    
    
   
   
  
    
}

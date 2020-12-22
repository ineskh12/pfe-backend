import { Grid } from './../../grids/interfaces/grid.interface';
import { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';

export interface Template extends Document {
    readonly name: string;
    readonly nbreofuses: number;
    readonly version: number;
    readonly gridId: Grid;
    readonly userId: User;
   
  
    
}

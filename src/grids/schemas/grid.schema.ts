import * as mongoose from 'mongoose';


export const GridSchema = new mongoose.Schema({
    items:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    

    
    

}, {
  timestamps: true
});


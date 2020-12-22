import * as mongoose from 'mongoose';


export const ItemSchema = new mongoose.Schema({
    type: { type: String, required: false},
    value: { type: String, required: false},
    bold :{ type: Boolean, default: false },
    italics :{ type: Boolean, default: false },
    underline :{ type: Boolean, default: false },
    fontsize :{ type: Number, default: false },
    x: { type: Number, required: false},
    y: { type: Number, required: false},
    h: { type: Number, required: false},
    w: { type: Number, required: false},
    widthimg: { type: Number, required: false},
    heightimg: { type: Number, required: false},
    

}, {
  timestamps: true
});


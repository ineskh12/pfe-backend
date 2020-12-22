import * as mongoose from 'mongoose';


export const TemplateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nbreofuses:{type: Number,default: 0 },
    version:{type: Number,default: 0 },
    gridId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Grid' },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    state: { type: Boolean, required: false ,defaulte:false},


    
    

}, {
  timestamps: true
});


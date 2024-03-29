const mongoose=require('mongoose');
const {Schema}=mongoose;

const BlogSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    username:{
        type:String
    },
    description:{
        type:String,
        required:true 
    },
    category:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports=mongoose.model('blogs',BlogSchema);
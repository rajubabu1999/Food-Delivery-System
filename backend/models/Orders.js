const mongoose=require("mongoose")

const {Schema} =mongoose;
const OrderSchema=new Schema({
        email: String,
        order_data:{
                type:Array,
                required:true,
        },
       


})
module.exports=mongoose.model('order',OrderSchema)
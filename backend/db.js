const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();
// 2uF7jMOCELYcpzDv
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = process.env.MONGO_URL // Customer change url to your db you created in atlas
// mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority

const mongoDB=async()=>{
  try{
    await mongoose.connect(mongoURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
});
console.log('connected to mongoDB');
// fetch data
const MyModel=await mongoose.connection.db.collection("foodData2");
const data=await MyModel.find({}).toArray();

// fetch food catagory
const foodCategory=await mongoose.connection.db.collection("foodCategory");
const catData=await foodCategory.find({}).toArray();
global.foodData2=data;
global.foodCategory=catData;


  }catch(err){
    console.log(err);
  }
}
module.exports=mongoDB;
  

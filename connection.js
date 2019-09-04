var mongoose=require("mongoose");

class Connection
{
  constructor()
  {
      this.mongooseObj=mongoose;
      this.con=mongoose.createConnection("mongodb+srv://ali95880:08081995ali@cluster0-1bit0.mongodb.net/contactDB?retryWrites=true&w=majority", {
      useCreateIndex:true ,
      useNewUrlParser: true})
    
  }


}


module.exports=Connection;
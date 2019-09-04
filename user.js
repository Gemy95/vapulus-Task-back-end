const connection= require("./connection");

class User
{
  constructor()
  {
     var connectionObj=new connection();

     this.userConnection=connectionObj.con;    

     this.mongooseObj=connectionObj.mongooseObj;

     this.userSchema=connectionObj.mongooseObj.Schema({
         _id: connectionObj.mongooseObj.Schema.Types.ObjectId,
         firstName:{type: String , minLength:3,maxLength:10} ,
         lastName:{type: String , minLength:3,maxLength:10} ,
         mobileNumber:{type: String,minLength:10,maxLength:15} ,
         email : {type: String,required:" is required",unique:true} ,
         image:{type: String} ,
         created_ts:{type:String}
     })

     this.userSchema.path('email').validate(function(val){
       var emailRegEx=/^[a-zA-Z]{3,15}[.]{1}[a-zA-Z0-9]{3,15}[@]{1}[a-z]{4,10}[.]{1}[a-z]{3,5}$/;
        return emailRegEx.test(val);
         },'invalid e-mail');


     this.userModel=this.userConnection.model("contact",this.userSchema,"contact");

  }


  addNewContact(obj)
  {
      
   var customObj={};
   customObj.firstName=obj.firstName;
   customObj.lastName=obj.lastName;
   customObj.mobileNumber=obj.mobileNumber;
   customObj.image=obj.image;
   customObj.email=obj.email;   
   customObj._id=this.mongooseObj.Types.ObjectId();
   customObj.created_ts=obj. created_ts;


    return new Promise((resolve,reject)=>{
        
        this.userModel.create(customObj ,function(err,data){
                 if(!err)
                 {
                    resolve("new user register success");
                 }
                 else if(err.code==11000)
                 {
                    reject("error in register duplication email");
                 }
                 else
                 {
                    reject("error in register");
                 }
            
                })
            });
    
    
  }


  getContacts()
  {
      return new Promise((resolve,reject)=>{
          this.userModel.find({},function(err,data){
              if(!err)
              resolve(data);
              else
              reject(err);
          })
      });
  }


}

module.exports=User;


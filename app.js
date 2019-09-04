
const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const cors = require('cors');
const multer =require("multer");
const userClass=require("./user");
const user=new userClass();

////////////////////////////////midleware//////////////////////////////////////

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret,Authorization");
    next();
    });


///////////////////////////////////////////////upload image////////////////////////////////////////////////


app.use(express.static("./public"));

const DIR = './public/uploads';

//var TimeNowForImage="";
var ImageValues="";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
       // TimeNowForImage=Date.now();
       //console.log("file.fieldname ="+file.fieldname );
       //console.log("file.originalname ="+file.originalname);
       ImageValues =file.fieldname +'-'+Date.now()+'-'+file.originalname  ;
   //    console.log("name will pass = " + ImageValues);
        cb(null, ImageValues );
       // path.extname(file.originalname);
    }
});
let upload = multer({storage: storage});

app.post('/api/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
});

////////////////////////////////////user////////////////////////////////////
    


app.post("/addContact",function(req,res){
    var data=req.body;
    console.log("data"+req.body);
  //  console.log("original="+req.body.imgURL);
  //  console.log("ImageValues="+ImageValues);
  //  console.log("IMAGE NAME before = " + data.imgURL);
    data.image=ImageValues;
  //  console.log("IMAGE NRW NAME after = " + data.imgURL);

    user.addNewContact(data).then((data)=>{
        ImageValues="";
    res.status(200).json(data);
    }).catch((err)=>{
        res.status(404).json(err);
    })
});


app.get("/getAllContacts",function(req,res){
    user.getContacts().then((data)=>{
        res.status(200).json(data);
    }).catch(
   (err)=>{res.status(404).json(err)}
    );
})



/////////////////////////////////////////////////////////////////////
const port=process.env.PORT || 3000;
app.listen( port ,function(){
    console.log("server listening success on port "+port);
})

var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");

// Connect to MongoDB
mongo.connect('mongodb://localhost:27017/lmsdev', {})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


var app = express()
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var Schema = mongo.Schema;
let schema = new Schema({
  fgtid: String,
  date: String,
  status: String,
  comments: String,
  remark: String,
  islop: Boolean,
  iscompoff: Boolean,
  iscasual: Boolean,
  isfestive: Boolean,
  isothers: Boolean,
  approvedby: String,
  isworkfromhome: Boolean
}, { timestamps: { createdAt: 'createdon', updatedAt: 'updatedon' }, strict: false, versionKey: false });
var model = mongo.model("leave", schema, "leave");

let empSchema = new Schema({
  fgtid: String,
  name: String,
  dob: String,
  gender: String,
  bloodgroup: String,
  cpr: String,
  address: String,
  phone: [],
  email: [],
  emergencyconatct: [],
  location: [],
  reportingto: [],
  releavingdate: String,
  role: String,
  companyemailid: String,
  avatar: String

}, { timestamps: { createdAt: 'createdon', updatedAt: 'updatedon' }, strict: false, versionKey: false });
var empModel = mongo.model("employee", empSchema, "employee");


let attSchema = new Schema({

  fgtid: String,
  attendence: []


}, { timestamps: { createdAt: 'createdon', updatedAt: 'updatedon' }, strict: false, versionKey: false });


var attModel = mongo.model("attendence", attSchema, "attendence");

let configschema = new Schema({
  fgtid: String,
  availfestiveholiday: String,
  availleaves: String,
  availsick: String,
  festiveholiday: [],
  mandatoryhd: [],
  leaveincremnet: [],
  superuser: [],
 
}, { timestamps: { createdAt: 'createdon', updatedAt: 'updatedon' }, strict: false , versionKey: false });

var confModel =mongo.model("config", configschema, "config");
app.get("/api/getConfig", function (req, res) {

  confModel.find({}, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
})

//  var UsersSchema = new Schema({      
//   uname: { type: String   },       
//   pwd: { type: String   },   
//   dob:{type:Date},
//   phno:{type:Number},
//   gender:{type:String}
//  });  


// var model = mongo.model('user', UsersSchema, 'user');  

app.post("/api/SaveUser", function (req, res) {
  console.log(req.body);
  var mod = new model(req.body);
  // if (req.body.mode == "Save") {
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send({ data: "Record has been Inserted..!!" });
      }
    });
  // }
  // else {

  //   console.log(req.body.mode);
  //   model.updateOne({ _id: req.body._id }, { name: req.body.name, address: req.body.address },

  //     function (err, data) {
  //       if (err) {
  //         res.send(err);
  //       }
  //       else {
  //         res.send({ data: "Record has been Updated..!!" });
  //       }
  //     });


  // }
})
app.post("/api/updateUser", function (req, res) {
  console.log(req.body._id);
   model.updateOne({ _id: req.body._id },  { fgtid: req.body.fgtid, date: req.body.date ,isworkfromhome:req.body.isworkfromhome,
    status: req.body.status, comments: req.body.comments ,remark: req.body.remark, islop: req.body.islop, iscompoff: req.body.iscompoff ,
    iscasual: req.body.iscasual, isfestive: req.body.isfestive ,isothers: req.body.isothers, approvedby: req.body.approvedby },
   

      function (err, data) {
        if (err) {
          res.send(err);
        }
        else {
          res.send({ data: "Record has been Updated..!!" });
        }
      });
})

app.post("/api/deleteUser", function (req, res) {
  model.remove({ _id: req.body.id }, function (err) {
    if (err) {
      res.send(err);
    }
    else {
      res.send({ data: "Record has been Deleted..!!" });
    }
  });
})



app.get("/api/getUser", function (req, res) {

  model.find({}, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
})

app.get("/api/getEmp", function (req, res) {

  empModel.find({}, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
})

app.post("/api/SaveEmp", function (req, res) {
 console.log(req.body);
  var mod = new empModel(req.body);
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      }
      else {
        res.send({ data: "Record has been Inserted..!!" });
      }
    });  
})

// phone: [],
// email: [],
// emergencyconatct: [],
// location: [],
// reportingto: [],

app.post("/api/updateEmp", function (req, res) {
  console.log(req.body);
  empModel.updateOne({ _id: req.body._id },{ fgtid: req.body.fgtid,name: req.body.name,dob: req.body.dob,gender:req.body.gender,
    bloodgroup:req.body.bloodgroup,cpr:req.body.cpr,address:req.body.address,phone:req.body.phone,email:req.body.email,
    emergencyconatct:req.body.emergencyconatct,location:req.body.location,reportingto:req.body.reportingto,
    releavingdate:req.body.releavingdate,role:req.body.role,companyemailid:req.body.companyemailid,avatar:req.body.avatar,},
   

      function (err, data) {
        if (err) {
          res.send(err);
        }
        else {
          res.send({ data: "Record has been Updated..!!" });
        }
      });
})

app.get("/api/getAtt", function (req, res) {

  attModel.find({}, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
})
app.listen(8081, function () {

  console.log('Example app listening on port 8081!')
}) 
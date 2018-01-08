let express = require('express');
let router = new express.Router();
let path = require('path');
let User = require('../models/user.js');
let Product = require('../models/product.js');
let fs = require('fs');
var multer = require('multer');

//Routes
router.get('/', function (req, res) {
  res.send(path.join(__dirname + './public/index.html'));
})


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'JPG')
  }
})
var upload = multer({ storage: storage });

router.post('/uploadpicturre', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return
    }
    res.json("success")
    
  })
})
router.post('/newproduct',upload.any() ,function (req, res) {
  var imgPath = req.files[0].path

  let newproduct = new Product ({
    title:req.body.title,
    category:req.body.category,
    userId:req.session.userId,
    description:req.body.description,
    latitude:req.body.latitude,
    longitude:req.body.longitude,

  })
  notchObj.img.data= fs.readFileSync(imgPath);
  notchObj.img.contentType='image/JPG'

  notchObj.save(function (err, notchObj) {
    if (err) throw err;

  });

});


// Receives and authenticates login information from existing users
router.post('/existinguser', function(req,res){
  User.findOne({ 'username': req.body.username }, function (err, user) {
    if (err) {
      console.log(err);
      res.send('unsuccessful');
    } else if (user == null) {
      res.send('unsuccessful');
    } else {
      var savedHash = user.password;
      bcrypt.compare(req.body.password, savedHash, function (err, status) {
                    // console.log(status);
                    if(status === true){
                      req.session.userId = user._id
                      res.json(user)
                    } else{
                      res.json('unsuccessful');
                    } 
                  });
    }
  })
}

);


module.exports = router;
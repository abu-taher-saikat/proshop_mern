const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const colors = require('colors');


const storage = multer.diskStorage({
    destination(req, file, cb) {
      // cb(null, './uploads/')
      cb(null, 'frontend/build/images/')
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })
  
  function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb('Images only!')
    }
  }
  
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })
  
  router.post('/', upload.single('image'), (req, res) => {
    const imageURL = req.file.path.replace(/\\/g, "/");
    console.log(req.file);
    // console.log(imageURL.red);
    const sendData = `/images/${req.file.filename}`
    console.log(sendData.red.bold)
    res.send(sendData)
  })

module.exports = router;  
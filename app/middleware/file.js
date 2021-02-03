var multer = require('multer');
const path = require('path')
var storage = multer.diskStorage({
    destination: "./public/images/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
module.exports = storage;
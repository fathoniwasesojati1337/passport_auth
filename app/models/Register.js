var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    nama_awal: {
        type:String,
        required:true
    },
    nama_akhir:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:
    {
        type:String,
        required:true
    }
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('RegisterUser', imageSchema);
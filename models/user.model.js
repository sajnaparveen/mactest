const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    mobilenumber:{type:Number,required:true},
    password:{type:String,required:true},
    loginStatus:{type: Boolean, required: false, default: false}
},{
    timestamps:true
})

userSchema.pre('save',function(next){
    this.uuid='USER-'+crypto.pseudoRandomBytes(4).toString('hex').toLocaleUpperCase()
    next()
})
module.exports = mongoose.model('user',userSchema,'user')